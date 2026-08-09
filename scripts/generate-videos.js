#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const GAMES_DIR = 'public/games';
const OUTPUT_DIR = 'public/videos';
const CLIP_DURATION = 5; // secondes par jeu
// Ces compilations servent de fond au hero, en plein écran mais sous un calque
// noir à 50 % et deux grilles. Elles sont chargées à chaque visite de l'accueil
// et pesaient ~19 Mo pièce en 1080p : le 720p à CRF 45 est indiscernable une
// fois le calque appliqué, pour un cinquième du poids.
const WIDTH = 1280;
const HEIGHT = 720;
const FPS = 24;
const CRF = 45;
const NUM_VIDEOS = 3;

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Fonction pour vérifier si un jeu a une vidéo
function hasVideo(gameFolder) {
  // Enlever le /games/ du début et garder seulement le nom du dossier
  const cleanFolder = gameFolder.replace('/games/', '');
  const videoPath = path.join(GAMES_DIR, cleanFolder, 'video.webm');
  console.log(`🔍 Vérification: ${gameFolder} -> ${cleanFolder} -> ${videoPath} -> ${fs.existsSync(videoPath) ? 'EXISTE' : 'N\'EXISTE PAS'}`);
  return fs.existsSync(videoPath);
}

// Fonction pour obtenir la durée d'une vidéo
function getVideoDuration(videoPath) {
  try {
    const output = execSync(`ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${videoPath}"`, { encoding: 'utf8' });
    return parseFloat(output.trim());
  } catch (error) {
    console.error(`❌ Erreur lors de la lecture de la durée pour ${videoPath}:`, error.message);
    return 0;
  }
}

// Fonction pour générer une vidéo de compilation
function generateCompilationVideo(videoNumber, videos) {
  console.log(`🎥 Génération de la vidéo ${videoNumber}/${NUM_VIDEOS}...`);
  
  if (videos.length === 0) {
    console.log('❌ Aucune vidéo valide trouvée');
    return false;
  }

  const outputPath = path.join(OUTPUT_DIR, `background-${videoNumber}.webm`);
  
  // Construire la commande FFmpeg
  const inputs = videos.map(video => `-i "${video.path}"`).join(' ');
  
  const videoFilter = videos.map((video, index) => {
    const maxStart = Math.max(0, video.duration - CLIP_DURATION - 1);
    const startTime = Math.floor(Math.random() * maxStart);
    return `[${index}:v]trim=start=${startTime}:duration=${CLIP_DURATION},setpts=PTS-STARTPTS,scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=decrease,pad=${WIDTH}:${HEIGHT}:(ow-iw)/2:(oh-ih)/2,setsar=1:1,fps=${FPS},fade=t=in:st=0:d=1,fade=t=out:st=${CLIP_DURATION-1}:d=1[v${index}]`;
  }).join(';');

  const concatFilter = `[${videos.map((_, i) => `v${i}`).join('][')}]concat=n=${videos.length}:v=1:a=0[outv]`;

  // `-an` : le hero rend ces vidéos en `muted`, la piste Opus n'était jamais
  // écoutée et pesait tout de même dans le téléchargement.
  const command = `ffmpeg ${inputs} -filter_complex "${videoFilter};${concatFilter}" -map "[outv]" -an -c:v libvpx-vp9 -crf ${CRF} -b:v 0 -row-mt 1 -cpu-used 3 -g 240 -y "${outputPath}"`;

  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ Vidéo ${videoNumber} générée avec succès`);
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors de la génération de la vidéo ${videoNumber}:`, error.message);
    return false;
  }
}

// Fonction principale
function main() {
  console.log('🎬 Début de la génération des vidéos de compilation...');
  
  // Lire le fichier games.json
  const gamesData = JSON.parse(fs.readFileSync('src/data/games.json', 'utf8'));
  
  // Filtrer seulement les jeux qui ont une vidéo
  const gamesWithVideos = gamesData.filter(game => {
    const hasVideoFile = hasVideo(game.contentFolder);
    if (!hasVideoFile) {
      console.log(`⚠️  ${game.title}: Pas de vidéo trouvée`);
    }
    return hasVideoFile;
  });
  
  console.log(`📋 ${gamesWithVideos.length} jeux avec vidéo trouvés sur ${gamesData.length} jeux total`);
  
  if (gamesWithVideos.length === 0) {
    console.log('❌ Aucun jeu avec vidéo trouvé');
    return;
  }

  // Préparer les données des vidéos
  const videos = gamesWithVideos.map(game => {
    const cleanFolder = game.contentFolder.replace('/games/', '');
    const videoPath = path.join(GAMES_DIR, cleanFolder, 'video.webm');
    const duration = getVideoDuration(videoPath);
    
    if (duration < CLIP_DURATION) {
      console.log(`⚠️  ${game.title}: Vidéo trop courte (${duration}s < ${CLIP_DURATION}s)`);
      return null;
    }
    
    return {
      path: videoPath,
      title: game.title,
      year: game.year || 0,
      duration: duration
    };
  }).filter(video => video !== null);

  // Trier par année (décroissante) puis par nom alphabétiquement
  videos.sort((a, b) => {
    // D'abord par année (décroissante)
    if (b.year !== a.year) {
      return b.year - a.year;
    }
    // Puis par nom alphabétiquement
    return a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' });
  });

  console.log('📅 Ordre des jeux dans les compilations:');
  videos.forEach((video, index) => {
    console.log(`  ${index + 1}. ${video.title} (${video.year})`);
  });

  console.log(`🎯 ${videos.length} vidéos valides pour la compilation`);
  
  if (videos.length === 0) {
    console.log('❌ Aucune vidéo valide pour la compilation');
    return;
  }

  // Générer les 3 vidéos avec l'ordre trié (année décroissante puis nom alphabétique)
  let successCount = 0;
  for (let i = 1; i <= NUM_VIDEOS; i++) {
    if (generateCompilationVideo(i, videos)) {
      successCount++;
    }
  }

  console.log(`\n🎯 Génération terminée ! ${successCount}/${NUM_VIDEOS} vidéos créées avec succès`);
  
  // Créer le fichier de métadonnées
  const metadata = {
    generatedAt: new Date().toISOString(),
    totalVideos: successCount,
    clipDuration: CLIP_DURATION,
    resolution: `${WIDTH}x${HEIGHT}`,
    totalGames: videos.length,
    videos: videos.map(v => ({
      title: v.title,
      path: v.path,
      duration: v.duration
    }))
  };
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'metadata.json'), JSON.stringify(metadata, null, 2));
  console.log('📝 Fichier de métadonnées créé');
}

main(); 