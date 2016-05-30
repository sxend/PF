
export default function keyMirror(keys: string[]): any {
  let mirrored = {};
  if (keys !== void 0 || keys !== null) {
    keys.forEach(key => mirrored[key] = key);
  }
  return mirrored;
}
