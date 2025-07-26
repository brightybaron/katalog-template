import SimpleParallax from "simple-parallax-js";

const ParallaxSection = ({ image }: { image: string }) => {
  return (
    <SimpleParallax delay={0} scale={1.25}>
      <img
        src={image}
        alt=""
        className="w-full object-cover object-center h-[110dvh] lg:h-full"
      />
    </SimpleParallax>
  );
};

export default ParallaxSection;
