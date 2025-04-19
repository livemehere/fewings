import React, { useContext, cloneElement, Children } from "react";
import { useControlledState } from "@fewings/react/hooks";
import { AccordionContext } from "./AccordionContext";

const Root = ({
  children,
  initialOpen = false,
  open: openProp,
  onChangeOpen,
  disabled,
}: {
  children: React.ReactNode;
  open?: boolean;
  onChangeOpen?: (v: boolean) => void;
  initialOpen?: boolean;
  disabled?: boolean;
}) => {
  const [open = false, setOpen] = useControlledState({
    value: openProp,
    defaultValue: initialOpen,
    onChange: onChangeOpen,
  });
  return (
    <AccordionContext.Provider
      value={{ open, setOpen: disabled ? () => {} : setOpen }}
    >
      {children}
    </AccordionContext.Provider>
  );
};
Root.displayName = "AccordionRoot";

const Trigger = ({ children }: { children: React.ReactElement<any> }) => {
  const { open, setOpen } = useContext(AccordionContext);
  return Children.map(children, (child) =>
    cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        if (children.props.onClick) {
          children.props.onClick(e);
        }
        setOpen(!open);
      },
    })
  );
};
Trigger.displayName = "AccordionTrigger";

const Panel = ({
  children,
  wrapper,
}: {
  children: React.ReactNode;
  wrapper?: React.ComponentType;
}) => {
  const Wrapper = wrapper || React.Fragment;
  const { open } = useContext(AccordionContext);
  return <Wrapper>{open && children}</Wrapper>;
};
Panel.displayName = "AccordionPanel";

export const Accordion = {
  Root,
  Trigger,
  Panel,
  Consumer: AccordionContext.Consumer,
};
