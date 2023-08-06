import { Outlet } from "react-router-dom";
import Slider from "react-slick";
import { Image } from "@/components/UI/Image";

const CAROUSEL = [
  {
    image:
      "https://res.cloudinary.com/matec-technology-services/image/upload/v1691258989/smartflock/carousel-img-1_m1jgbz.jpg"
  },
  {
    image:
      "https://res.cloudinary.com/matec-technology-services/image/upload/v1691258982/smartflock/carousel-img-2_spfj7o.jpg"
  },
  {
    image:
      "https://res.cloudinary.com/matec-technology-services/image/upload/v1691258985/smartflock/carousel-img-3_s4ya1n.jpg"
  }
];

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  return (
    <main className="block bg-white">
      <div className="fixed h-screen w-screen overlay bg-black/60 z-10" />
      <Slider {...settings} className="fixed h-screen w-full bg-primary-5">
        {CAROUSEL.map((item) => (
          <div key={item.image}>
            <div className="overflow-hidden h-full">
              <Image src={item.image} className="h-screen" />
            </div>
          </div>
        ))}
      </Slider>

      <section className="z-50 mx-auto flex h-full min-h-screen w-full basis-3/5 flex-col items-center justify-center overflow-y-scroll  py-14 xl:w-4/5">
        {children ? children : <Outlet />}
      </section>
    </main>
  );
}
