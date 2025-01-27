import { ComponentProps, FunctionComponent } from 'react';
import Copy2Icon from '../../public/assets/svg/copy2.svg?react';
import ReactIcon from '../../public/assets/svg/react.svg?react';
import ViteIcon from '../../public/assets/svg/vite.svg?react';

export type IconKeys = 'copy2' | 'react' | 'vite'

export const IconMap: Record<IconKeys, FunctionComponent<ComponentProps<'svg'> & { title?: string; titleId?: string; desc?: string; descId?: string }>> = {
'copy2':Copy2Icon,
'react':ReactIcon,
'vite':ViteIcon
};
