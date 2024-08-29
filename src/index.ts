import { extname, join } from 'node:path';
import { existsSync } from 'node:fs';
import type { CustomResolver } from 'metro-resolver';
import { ResolverFactory, type NapiResolveOptions } from 'oxc-resolver';

const DEFAULT_TS_CONFIG = join(process.cwd(), 'tsconfig.json');
const DEFAULT_OPTIONS: Partial<NapiResolveOptions> = {
  exportsFields: [],
  conditionNames: ['react-native', 'browser'],
  aliasFields: ['react-native', 'browser'],
  tsconfig: existsSync(DEFAULT_TS_CONFIG)
    ? {
        configFile: DEFAULT_TS_CONFIG,
      }
    : undefined,
};

export function createOxcResolver(
  oxcOptions?: NapiResolveOptions
): CustomResolver {
  const cache = new Map<string | null, ResolverFactory>();
  return (context, moduleName, platform) => {
    const extension = extname(moduleName);
    if (!(context.assetExts as unknown as Set<string>).has(extension)) {
      let resolver = cache.get(platform)!;
      if (!resolver) {
        const prefixes: string[] = [];
        if (platform) {
          prefixes.push(`.${platform}`);
        }
        if (context.preferNativePlatform) {
          prefixes.push('.native');
        }
        prefixes.push('');
        resolver = new ResolverFactory({
          ...DEFAULT_OPTIONS,
          mainFields: context.mainFields.slice(),
          extensions: context.sourceExts
            .map((ext) => prefixes.map((prefix) => `${prefix}.${ext}`))
            .flat(),
          ...oxcOptions,
        });
        cache.set(platform, resolver);
      }

      const directory = context.originModulePath.substring(
        0,
        context.originModulePath.lastIndexOf('/')
      );
      const result = resolver.sync(directory, moduleName);
      if (result.path) {
        return { filePath: result.path, type: 'sourceFile' };
      }
    }

    return context.resolveRequest(context, moduleName, platform);
  };
}
