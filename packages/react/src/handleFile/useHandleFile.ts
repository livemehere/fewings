import { useEffect, useRef, useState } from 'react';
import { convertFilesWithMeta, setUpOptions, validateOptions } from './util';
import {
  THandleFileOptions,
  TFileWithMeta,
  THandleFileEventHooks,
} from './schema';

export function useHandleFile({
  onChange,
  onError,
  ...options
}: THandleFileOptions & THandleFileEventHooks) {
  const ref = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    const inputEl = document.createElement('input');
    inputEl.type = 'file';
    ref.current = inputEl;
  }, []);

  const _setupInputOption = () => {
    const inputEl = ref.current;
    if (!inputEl) {
      throw new Error('input element is not created.');
    }
    setUpOptions(inputEl, options);
    return inputEl;
  };

  const _makeResults = async (files: FileList) => {
    if (files.length === 0) {
      throw new Error('No files selected');
    }
    await validateOptions(files, options);
    return convertFilesWithMeta(files);
  };

  const select = () => {
    const inputEl = _setupInputOption();
    return new Promise<TFileWithMeta[]>((resolve, reject) => {
      inputEl.onchange = async (e) => {
        try {
          const files = (e.target as HTMLInputElement).files;
          if (!files) {
            return reject('No files selected');
          }
          const results = await _makeResults(files);
          resolve(results);
          onChange?.(results);
        } catch (e) {
          reject(e);
          if (e instanceof Error) {
            onError?.(e);
          }
        } finally {
          inputEl.onchange = null;
        }
      };
      inputEl.click();
    });
  };

  /**
   * Register drag and drop functionality to any component
   */
  const register = () => {
    return {
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
      },
      onDragEnter: (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
      },
      onDragLeave: (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
      },
      onDrop: async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        try {
          const files = e.dataTransfer.files;
          if (!files || files.length === 0) {
            throw new Error('No files selected');
          }
          const results = await _makeResults(files);
          onChange?.(results);
        } catch (e) {
          if (e instanceof Error) {
            onError?.(e);
          }
        }
      },
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        select();
      },
    };
  };

  return {
    select,
    register,
    inputRef: ref,
    isDragOver,
  };
}
