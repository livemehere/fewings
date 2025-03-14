import { useEffect, useRef } from "react";
import { convertFilesWithMeta, setUpOptions, validateOptions } from "./util";
import { FileInputOptions, FileWithMeta } from "./types";

export function useFileInput() {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputEl = document.createElement("input");
    ref.current = inputEl;
  }, []);

  const open = (options?: FileInputOptions) => {
    const inputEl = ref.current;
    if (!inputEl) {
      throw new Error("input element is not created for useFileInput");
    }
    setUpOptions(inputEl, options);
    return new Promise<FileWithMeta[]>((resolve, reject) => {
      inputEl.onchange = async (e) => {
        try {
          const files = (e.target as HTMLInputElement).files;
          if (!files) {
            return reject("No files selected");
          }
          await validateOptions(files, options);
          resolve(convertFilesWithMeta(files));
        } catch (e) {
          reject(e);
        } finally {
          inputEl.onchange = null;
        }
      };
      inputEl.click();
    });
  };

  return { open };
}
