import {
  LazyLoadImage,
  LazyLoadImageProps
} from "react-lazy-load-image-component";
import { clsxm } from "@/lib/utils";

enum Ratio {
  "4/3",
  "3/4",
  "6/4",
  "4/6",
  "16/9",
  "9/16",
  "21/9",
  "9/21",
  "1/1"
}

export type ImageProps = {
  disabledEffect?: boolean;
  effect?: string;
  ratio?: keyof typeof Ratio;
  className?: string;
} & LazyLoadImageProps;

const Image = ({
  ratio,
  disabledEffect = false,
  effect = "blur",
  className,
  ...other
}: ImageProps) => {
  if (ratio) {
    return (
      <span
        className={clsxm(
          "relative block w-full overflow-hidden leading-none",
          `$pt-${getRatio(ratio)}`,
          className
        )}
      >
        <LazyLoadImage
          wrapperClassName="wrapper inset-0 leading-none absolute bg-cover"
          effect={disabledEffect ? undefined : effect}
          placeholderSrc="https://zone-assets-api.vercel.app/assets/img_placeholder.svg"
          className="h-1 w-1 object-cover"
          {...other}
        />
      </span>
    );
  }

  return (
    <span className={clsxm("block overflow-hidden leading-none", className)}>
      <LazyLoadImage
        wrapperClassName="wrapper w-full h-full bg-cover blur-0"
        effect={disabledEffect ? undefined : effect}
        className="h-full w-full object-cover"
        placeholderSrc=""
        {...other}
      />
    </span>
  );
};

Image.displayName = "Image";

export { Image };

const getRatio = (ratio = "1/1") => {
  return {
    "4/3": "calc(100% / 4 * 3)",
    "3/4": "calc(100% / 3 * 4)",
    "6/4": "calc(100% / 6 * 4)",
    "4/6": "calc(100% / 4 * 6)",
    "16/9": "calc(100% / 16 * 9)",
    "9/16": "calc(100% / 9 * 16)",
    "21/9": "calc(100% / 21 * 9)",
    "9/21": "calc(100% / 9 * 21)",
    "1/1": "100%"
  }[ratio];
};
