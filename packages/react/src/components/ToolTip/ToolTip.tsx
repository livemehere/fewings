import { useTooltip } from "./useTooltip";
import { ToolTipOptions } from "./schema";
import { Popover } from "../Popover";

interface Props extends ToolTipOptions {
  children: React.ReactElement;
  content: React.ReactNode;
  open?: boolean;
}

export default function ToolTip({
  children,
  content,
  open,
  dir: _dir,
  gap,
  arrowColor,
}: Props) {
  const { marginStyle, arrowProps, dir } = useTooltip({
    dir: _dir,
    gap,
    arrowColor,
  });

  return (
    <Popover.Root type="hover" open={open} key={dir}>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Panel anchor={`${dir}-center`} portal={true}>
        <div
          style={{
            position: "relative",
            ...marginStyle,
          }}
        >
          <svg width="8" height="8" fill="none" style={arrowProps.style}>
            <path d="M3.99996 0L8 8H4H0L3.99996 0Z" fill={arrowProps.fill} />
          </svg>
          {content}
        </div>
      </Popover.Panel>
    </Popover.Root>
  );
}
