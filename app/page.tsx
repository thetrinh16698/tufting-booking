import './page.css';
import ServiceListPreview from '@app/components/ServiceList/ServiceListPreview';
import ScrollIntoView from '@app/components/ScrollIntoView/ScrollIntoView';
import { getServices } from '@app/lib/services';
import testIds from '@app/utils/test-ids';

export default async function Home() {
  const services = await getServices();
  return (
    <div>
      <div
        className="text-center w-full min-h-screen relative"
        data-testid={testIds.HOME_PAGE.HEADER}
      >
        <video autoPlay muted loop className="video-background">
          <source
            src="/home-background-video.mp4"
            type="video/mp4"
          />
        </video>
        <div className="text-center px-3">
          <div className="font-sans font-bold uppercase tracking-widest pt-16">
            Create beautiful tufted art
          </div>
          <div className="font-lulo text-4xl sm:text-6xl md:text-8xl pt-4">
            Tufting Studio
          </div>
          <div className="text-xl pt-6 tracking-wider">
            Book your tufting sessions and workshops
          </div>
          <div className="pt-7">
            <a
              className="btn-main"
              href="/book-now"
              data-testid={testIds.HOME_PAGE.BOOK_NOW_CTA}
            >
              Book Now
            </a>
          </div>
        </div>
      </div>

      <div className="mt-[-175px]">
        <ScrollIntoView hashName="#about" offset="-128px" />
        <div className="w-full bg-white h-full relative">
          <div className="max-w-full-content mx-auto h-full">
            <div className="pl-5 py-2 pr-5 sm:w-2/4 sm:pr-24 sm:pr-0">
              <div className="header-line my-8"></div>
              <h2 className="mb-7 mt-10 tracking-tighter max-w-xs title">
                About Tufting
              </h2>
              <p className="text-sm flex-1 leading-7">
                Tufting is a textile technique where loops of yarn are pulled through a base fabric to create a soft, plush surface. Our studio offers hands-on workshops where you can learn this beautiful craft and create your own unique pieces.
              </p>
              <p>&nbsp;</p>
              <p className="text-sm flex-1 leading-7">
                Whether you're a complete beginner or looking to refine your skills, our experienced instructors will guide you through the process. From choosing colors and patterns to mastering the tufting gun, you'll leave with both knowledge and a beautiful handmade creation.
              </p>
              <div className="mt-11 mb-20">
                <a href="/about-me" className="btn-main">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="w-full sm:absolute sm:top-0 sm:left-2/4 sm:w-2/4 h-full">
            <div className="bg-[url('/about-me.jpeg')] w-full h-full bg-cover min-h-[320px]"></div>
          </div>
        </div>
      </div>
      <div className="parallax-background">
        {services?.length ? (
          <div
            className="max-w-full-content mx-auto bg-transparent p-5"
            data-testid={testIds.HOME_PAGE.SERVICES_SECTION}
          >
            <div className="header-line my-8"></div>
            <h2 className="mb-7 mt-10 tracking-tighter title max-w-xs">
              Our Services
            </h2>

            <>
              <ServiceListPreview services={services} />
              <div className="flex my-8 justify-center">
                <a className="btn-main" href="/book-now">
                  More Services
                </a>
              </div>
            </>
          </div>
        ) : null}
      </div>
    </div>
  );
}
