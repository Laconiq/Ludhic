import type { JsonLdSchema } from '@/types/game';

/** Injecte un ou plusieurs schémas JSON-LD dans le HTML pré-rendu. */
export default function JsonLd({ schema }: { schema: JsonLdSchema | JsonLdSchema[] }) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
