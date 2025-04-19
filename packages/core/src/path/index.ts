function normalizePath(path: string): string {
  return path.replace(/\/+$/, "");
}

export function getSharedPathPrefix(path1: string, path2: string): string {
  const p1 = normalizePath(path1).split("/");
  const p2 = normalizePath(path2).split("/");
  const commonSegments = [];

  for (let i = 0; i < Math.min(p1.length, p2.length); i++) {
    if (p1[i] === p2[i]) {
      commonSegments.push(p1[i]);
    } else {
      break;
    }
  }

  return commonSegments.join("/");
}

export function getPathDepthDiff(from: string, to: string): number {
  const fromSegments = normalizePath(from).split("/");
  const toSegments = normalizePath(to).split("/");
  return toSegments.length - fromSegments.length;
}

export function resolveRelativeImportPath(from: string, to: string): string {
  const commonPath = getSharedPathPrefix(from, to);
  const fromDepth = getPathDepthDiff(commonPath, from);
  const relativeSegments = normalizePath(to)
    .slice(commonPath.length)
    .split("/")
    .filter(Boolean);

  const up = "../".repeat(fromDepth) || "./";
  return up + relativeSegments.join("/");
}
