import { ComponentProps, FunctionComponent } from 'react';
import Group_copy2Icon from '../../public/assets/svg/group/copy2.svg?react';
import Icons_reactIcon from '../../public/assets/svg/icons/react.svg?react';
import Icons_viteIcon from '../../public/assets/svg/icons/vite.svg?react';
import Icons_vite2Icon from '../../public/assets/svg/icons/vite2.svg?react';
import Third_reactIcon from '../../public/assets/svg/third/react.svg?react';

export type IconKeys = 'group/copy2' | 'icons/react' | 'icons/vite' | 'icons/vite2' | 'third/react'

export const IconMap: Record<IconKeys, FunctionComponent<ComponentProps<'svg'> & { title?: string; titleId?: string; desc?: string; descId?: string }>> = {
'group/copy2': Group_copy2Icon,
'icons/react': Icons_reactIcon,
'icons/vite': Icons_viteIcon,
'icons/vite2': Icons_vite2Icon,
'third/react': Third_reactIcon
};
