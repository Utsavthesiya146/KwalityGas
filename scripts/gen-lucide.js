const fs = require('fs');

async function main() {
  const m = await import('lucide-react');
  const keys = Object.keys(m).filter(k => /^[A-Z]/.test(k));
  const uniqueKeys = Array.from(new Set(keys));
  
  const lines = [
    'declare module "lucide-react" {',
    '  import * as React from "react";',
    '  export interface LucideProps extends React.SVGProps<SVGSVGElement> {',
    '    size?: string | number;',
    '    color?: string;',
    '    strokeWidth?: string | number;',
    '    className?: string;',
    '  }',
    '  export type LucideIcon = React.ForwardRefExoticComponent<',
    '    React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>',
    '  >;',
    ...uniqueKeys.map(k => `  export const ${k}: LucideIcon;`),
    '  const icons: { [key: string]: LucideIcon };',
    '  export default icons;',
    '}',
    ''
  ];
  fs.writeFileSync('src/types/declarations.d.ts', lines.join('\n'), 'utf8');
  console.log(`Generated declarations for ${uniqueKeys.length} Lucide icons.`);
}

main().catch(console.error);

