export function getCommonPath(path1: string, path2: string) {
  const path1Segments = path1.split("/");
  const path2Segments = path2.split("/");
  const commonSegments = [];

  for (
    let i = 0;
    i < Math.min(path1Segments.length, path2Segments.length);
    i++
  ) {
    if (path1Segments[i] === path2Segments[i]) {
      commonSegments.push(path1Segments[i]);
    } else {
      break;
    }
  }

  return commonSegments.join("/");
}

export function getDepthFrom(start: string, path: string) {
  const pathSegments = path.split("/");
  const startSegments = start.split("/");
  return pathSegments.length - startSegments.length;
}

export function getRelativePath(from: string, to: string) {
  const commonPath = getCommonPath(from, to);
  const fromDepth = getDepthFrom(commonPath, from);
  return ("../".repeat(fromDepth) || "./") + to.slice(commonPath.length + 1);
}
