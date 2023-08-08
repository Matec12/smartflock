import {
  ElementType,
  PropsWithChildren,
  ComponentPropsWithoutRef
} from "react";

export type PolymorphicAsProp<E extends ElementType> = {
  as?: E;
};

export type PolymorphicProps<E extends ElementType> = PropsWithChildren<
  ComponentPropsWithoutRef<E> & PolymorphicAsProp<E>
>;

export enum BadgeVariant {
  Ghost = "ghost",
  Outlined = "outlined",
  Filled = "filled"
}

export enum BadgeColor {
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Danger = "danger",
  Info = "info",
  Warning = "warning"
}

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Danger = "danger",
  Success = "success",
  Info = "info",
  Warning = "warning"
}
