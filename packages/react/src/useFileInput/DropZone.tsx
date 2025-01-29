import { Children, cloneElement, ReactElement } from "react";
import { convertFilesWithMeta, validateOptions } from "./util";
import { FileInputOptions, FileWithMeta } from "./types";

interface Props {
  children: React.ReactElement;
  onDrop: (files: FileWithMeta[]) => void;
  onError?: (error: Error) => void;
  options?: FileInputOptions;
}

export function DropZone({ children, onDrop, onError, options }: Props) {
  return Children.toArray(children).map((child) => {
    const c = child as ReactElement<any>;
    return cloneElement(c, {
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        c.props.onDragOver?.(e);
      },
      onDragEnter: (e: React.DragEvent) => {
        e.preventDefault();
        c.props.onDragEnter?.(e);
      },
      onDragLeave: (e: React.DragEvent) => {
        e.preventDefault();
        c.props.onDragLeave?.(e);
      },
      onDrop: async (e: React.DragEvent) => {
        e.preventDefault();
        c.props.onDrop?.(e);
        const files = e.dataTransfer.files;
        try {
          await validateOptions(files, options);
          onDrop(convertFilesWithMeta(files));
        } catch (e) {
          if (onError) {
            onError(e as Error);
          }
        }
      },
    });
  });
}
