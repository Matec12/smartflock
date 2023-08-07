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

export enum UserRole {
  org_admin = "organization_admin",
  org_staff = "organization_staff",
  admin = "admin"
}
