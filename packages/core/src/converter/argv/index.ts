export function parseArgv(argv: string[]) {
  const result = {} as Record<string, string | boolean>;
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      const value =
        argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : true;
      result[key] = value;
      if (value !== true) i++;
    }
  }
  return result;
}
