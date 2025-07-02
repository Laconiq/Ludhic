#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const GAMES_DATA_PATH = '../src/data/games.json';
const PUBLIC_GAMES_PATH = '../public/games';
const OUTPUT_PATH = '../public/videos';
const SEGMENT_DURATION = 5; // 5 secondes par jeu
const TRANSITION_DURATION = 1; // 1 seconde de transition
const TOTAL_VIDEOS = 3;

// Charger les données des jeux
const gamesData = JSON.parse(fs.readFileSync(path.resolve(__dirname, GAMES_DATA_PATH), 'utf8'));
const gamesWithVideo = gamesData.filter(game => game.hasVideo);

console.log(`🎬 Génération de ${TOTAL_VIDEOS} vidéos avec ${gamesWithVideo.length} jeux...`);

// Créer le dossier de sortie
if (!fs.existsSync(path.resolve(__dirname, OUTPUT_PATH))) {
  fs.mkdirSync(path.resolve(__dirname, OUTPUT_PATH), { recursive: true });
}

// Fonction pour vérifier si une vidéo existe
function videoExists(gamePath) {
  const videoPath = path.resolve(__dirname, PUBLIC_GAMES_PATH, gamePath.replace('/games/', ''), 'video.webm');
  return fs.existsSync(videoPath);
}

// Fonction pour générer une vidéo
function generateVideo(videoIndex) {
  console.log(`\n🎥 Génération de la vidéo ${videoIndex + 1}/${TOTAL_VIDEOS}...`);
  
  const outputFile = path.resolve(__dirname, OUTPUT_PATH, `background-${videoIndex + 1}.webm`);
  const filterComplex = [];
  const inputs = [];
  let inputIndex = 0;
  
  // Préparer les segments pour chaque jeu
  gamesWithVideo.forEach((game, gameIndex) => {
    const gamePath = game.contentFolder.replace('/games/', '');
    const videoPath = path.resolve(__dirname, PUBLIC_GAMES_PATH, gamePath, 'video.webm');
    
    if (!videoExists(game.contentFolder)) {
      console.log(`⚠️  Vidéo manquante pour ${game.title}, ignorée`);
      return;
    }
    
    inputs.push(`-i "${videoPath}"`);
    
    // Démarrer à un temps aléatoire différent pour chaque vidéo
    const randomOffset = (videoIndex * 10 + gameIndex * 3) % 30; // Variation par vidéo
    
    filterComplex.push(
      `[${inputIndex}:v]trim=start=${randomOffset}:duration=${SEGMENT_DURATION},scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fade=t=in:st=0:d=${TRANSITION_DURATION},fade=t=out:st=${SEGMENT_DURATION - TRANSITION_DURATION}:d=${TRANSITION_DURATION}[v${inputIndex}];`,
      `[${inputIndex}:a]atrim=start=${randomOffset}:duration=${SEGMENT_DURATION},afade=t=in:st=0:d=${TRANSITION_DURATION},afade=t=out:st=${SEGMENT_DURATION - TRANSITION_DURATION}:d=${TRANSITION_DURATION}[a${inputIndex}];`
    );
    
    inputIndex++;
  });
  
  // Concaténer tous les segments
  const videoStreams = Array.from({ length: inputIndex }, (_, i) => `[v${i}]`).join('');
  const audioStreams = Array.from({ length: inputIndex }, (_, i) => `[a${i}]`).join('');
  
  filterComplex.push(
    `${videoStreams}concat=n=${inputIndex}:v=1:a=0[outv];`,
    `${audioStreams}concat=n=${inputIndex}:v=0:a=1[outa]`
  );
  
  // Commande FFmpeg
  const ffmpegCommand = `ffmpeg ${inputs.join(' ')} -filter_complex "${filterComplex.join('')}" -map "[outv]" -map "[outa]" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k -shortest -y "${outputFile}"`;
  
  try {
    console.log(`🔄 Exécution de FFmpeg...`);
    execSync(ffmpegCommand, { stdio: 'inherit' });
    console.log(`✅ Vidéo ${videoIndex + 1} générée: ${outputFile}`);
  } catch (error) {
    console.error(`❌ Erreur lors de la génération de la vidéo ${videoIndex + 1}:`, error.message);
  }
}

// Fonction pour créer le fichier de configuration
function createVideoConfig() {
  const config = {
    videos: Array.from({ length: TOTAL_VIDEOS }, (_, i) => ({
      path: `/videos/background-${i + 1}.webm`,
      index: i + 1
    })),
    totalGames: gamesWithVideo.length,
    segmentDuration: SEGMENT_DURATION,
    transitionDuration: TRANSITION_DURATION,
    generatedAt: new Date().toISOString()
  };
  
  const configPath = path.resolve(__dirname, OUTPUT_PATH, 'video-config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`📝 Configuration sauvegardée: ${configPath}`);
}

// Fonction principale
function main() {
  console.log('🎬 Générateur de vidéos d\'arrière-plan Ludhic');
  console.log('=============================================');
  
  if (gamesWithVideo.length === 0) {
    console.log('❌ Aucun jeu avec vidéo trouvé dans games.json');
    return;
  }
  
  console.log(`📋 Jeux avec vidéo: ${gamesWithVideo.length}`);
  gamesWithVideo.forEach(game => {
    const hasVideo = videoExists(game.contentFolder);
    console.log(`  ${hasVideo ? '✅' : '❌'} ${game.title} (${game.year})`);
  });
  
  // Vérifier FFmpeg
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
  } catch (error) {
    console.error('❌ FFmpeg n\'est pas installé. Veuillez l\'installer d\'abord.');
    console.log('📥 Téléchargement: https://ffmpeg.org/download.html');
    return;
  }
  
  // Générer les vidéos
  for (let i = 0; i < TOTAL_VIDEOS; i++) {
    generateVideo(i);
  }
  
  // Créer la configuration
  createVideoConfig();
  
  console.log('\n🎉 Génération terminée !');
  console.log(`📁 Vidéos générées dans: ${path.resolve(__dirname, OUTPUT_PATH)}`);
  console.log('🚀 Vous pouvez maintenant utiliser ces vidéos dans VideoBackground.tsx');
}

// Exécuter le script
if (require.main === module) {
  main();
}

module.exports = { generateVideo, createVideoConfig }; 