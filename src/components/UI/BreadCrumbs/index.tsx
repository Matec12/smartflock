import { Icon } from "@iconify/react";
import { H4, PrimaryLink } from "..";
import { BreadCrumbList } from "./components/BreadCrumbList";
import { BreadCrumbItem } from "./components/BreadCrumbItem";
import { clsxm } from "@/lib/utils";

interface BreadCrumbsProps {
  breadCrumbTitle?: string;
  breadCrumbActive?: string;
  breadCrumbParent?: string;
  breadCrumbParent2?: string;
  breadCrumbParent3?: string;
  breadCrumbParentLink?: string;
  breadCrumbParent2Link?: string;
  breadCrumbParent3Link?: string;
}

const BreadCrumbs = (props: BreadCrumbsProps) => {
  const {
    breadCrumbTitle,
    breadCrumbParent,
    breadCrumbParent2,
    breadCrumbParent3,
    breadCrumbParentLink,
    breadCrumbParent2Link,
    breadCrumbParent3Link,
    breadCrumbActive
  } = props;

  return (
    <div className="content-header flex flex-wrap items-center">
      <div className="content-header-left mb-6 shrink-0 grow-0 basis-full md:basis-3/4">
        <div className="breadcrumbs-top flex flex-wrap items-center">
          <div className="shrink-0 grow-0 basis-full">
            {breadCrumbTitle ? (
              <H4
                className={clsxm(
                  "content-header-title float-left mb-0  pr-4 font-medium text-headings",
                  { "border-r": breadCrumbActive }
                )}
              >
                {breadCrumbTitle}
              </H4>
            ) : (
              ""
            )}
            <div className="breadcrumb-wrapper vs-breadcrumbs hidden shrink-0 grow-0 basis-full sm:block">
              <BreadCrumbList className="items-center gap-1">
                {breadCrumbActive && (
                  <>
                    <BreadCrumbItem as="li">
                      <PrimaryLink href="/">Home</PrimaryLink>
                    </BreadCrumbItem>{" "}
                    <Icon icon="material-symbols:chevron-right-rounded" />
                  </>
                )}
                {breadCrumbParent ? (
                  <>
                    <BreadCrumbItem as="li" className="text-primary">
                      <PrimaryLink href={breadCrumbParentLink!}>
                        {breadCrumbParent}
                      </PrimaryLink>
                    </BreadCrumbItem>
                  </>
                ) : null}
                {breadCrumbParent2 ? (
                  <>
                    <Icon icon="material-symbols:chevron-right-rounded" />
                    <BreadCrumbItem as="li" className="text-primary">
                      <PrimaryLink href={breadCrumbParent2Link!}>
                        {breadCrumbParent2}
                      </PrimaryLink>
                    </BreadCrumbItem>
                  </>
                ) : (
                  ""
                )}
                {breadCrumbParent3 ? (
                  <>
                    <Icon icon="material-symbols:chevron-right-rounded" />
                    <BreadCrumbItem as="li" className="text-primary">
                      <PrimaryLink href={breadCrumbParent3Link!}>
                        {breadCrumbParent3}
                      </PrimaryLink>
                    </BreadCrumbItem>
                  </>
                ) : (
                  ""
                )}
                {/* <Icon icon="material-symbols:chevron-right-rounded" /> */}
                <BreadCrumbItem as="li" active>
                  {breadCrumbActive}
                </BreadCrumbItem>
              </BreadCrumbList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { BreadCrumbs };
