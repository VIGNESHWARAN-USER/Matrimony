import React, { useEffect } from 'react';
import firstImg from '../Images/WhatsApp Image 2024-06-14 at 14.31.47_9db33679.jpg';
import thImg3 from "../Images/trust-home-img3.jpg";
import thImg4 from "../Images/trust-home-img4.jpg";
import thImg5 from "../Images/trust-home-img5.jpg";
import thImg6 from "../Images/trust-home-img6.png";
import thImg7 from "../Images/trust-home-img7.jpg";
import rightHand from "../Images/righthand.jpg";
import guru from "../Images/guru.jpg";
import jeeva from "../Images/jeeva.jpg";
import Head from './Head';

const Home = () => {
  useEffect(() => {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    const showSlides = () => {
      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`;

      });

      slideIndex = (slideIndex + 1) % totalSlides;
    };

    const interval = setInterval(showSlides, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const seeMoreButton = document.getElementById('see-more');
    const detailsCard = document.getElementById('details-card');
    const closeDetailsButton = document.getElementById('close-details');

    if (seeMoreButton && detailsCard && closeDetailsButton) {
      seeMoreButton.addEventListener('click', () => {
        detailsCard.style.display = 'block';
      });

      closeDetailsButton.addEventListener('click', () => {
        detailsCard.style.display = 'none';
      });
    }

    return () => {
      if (seeMoreButton && detailsCard && closeDetailsButton) {
        seeMoreButton.removeEventListener('click', () => {
          detailsCard.style.display = 'block';
        });

        closeDetailsButton.removeEventListener('click', () => {
          detailsCard.style.display = 'none';
        });
      }
    };
  }, []);

  return (
    <div className="bg-[#F5CCA0] min-h-screen overflow-x-hidden">
      <Head />
      <div className="bg-[#f6ae6f] p-4 md:p-5 rounded-lg shadow-lg my-8 mx-auto max-w-5xl hover:scale-100 duration-500">
        <div className="about-container flex flex-col md:flex-row md:justify-between items-center md:space-x-4">
          <div className="about-image flex-1 mb-4 md:mb-0 max-w-full">
            <img src={firstImg} alt="About Image" className="w-full h-auto rounded-md hover:scale-100 duration-500" />
          </div>
          <div className="about-details flex-1 text-justify p-4">
            <h1 className="text-2xl font-bold text-center md:text-left text-white">About Us</h1>
            <p className="mt-4 text-white hover:scale-100 duration-500">
              இதுவரை…..<br />
              கடந்த 12.07.2002-ம் தேதி சென்னை சித்த வித்தியார்த்திகள் அப்பியாச நிலையம்  அறக்கட்டளை, எண் 15, SSV கோவில் தெரு, பெரம்பூர் என்ற முகவரியில் பிரம்மஶ்ரீ. ரவீந்திரன், பிரம்மஶ்ரீ. சந்திரசேகரன், பிரம்மஶ்ரீ. கோதண்டவேலு, பிரம்மஶ்ரீ. செல்வராஜ், பிரம்மஶ்ரீ. ஞானசேகரன், பிரம்மஶ்ரீ. சுப்பிரமணியன், பிரம்மஶ்ரீ. இளங்கோவன் ஆகிய 7 பேரைக் கொண்டு பதிவு செய்யப்பட்டு அப்பியாசம் நடத்தப்பட்டது. அவ்வாறு உருவான அறக்கட்டளையில், டாக்டர் ரவீந்திரனுக்கு சொந்தமான பெரியபாளையத்திலுள்ள அவரது இடத்தை 06.03.2006-ம் தேதி வித்தியார்த்திகளுக்கான சமாதியை வைப்பதற்காக சமாதி பூங்கா இலவசமாக அளிக்கப்பட்டது.
            </p>
            <button id="see-more" className="bg-[#994D1C] text-white font-bold py-2 px-4 rounded-lg mt-6 hover:scale-105 hover:text-black hover:bg-white">See more</button>
          </div>
        </div>
        <div className="details-card fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-md z-50 max-w-3xl w-full hidden" id="details-card">
          <div className="details-content text-justify">
            <h2 className="text-xl font-bold">Full Details</h2>
            <p className="my-4">
              அந்நிலத்தில் இன்று வரை 45-க்கும் மேற்பட்ட வித்தியார்த்திகளுக்கு சமாதி வைக்கப்பட்டுள்ளது. இந்நிலையில் அறக்கட்டளையின் ஆவணங்கள் சேதமடைந்ததால், 06.07.2016-ம் தேதி பிரம்மஶ்ரீ. கோதண்டவேலு, பிரம்மஶ்ரீ. சுப்பிரமணியன், பிரம்மஶ்ரீ. பக்தன் ஆகியோர் புதியதாக சென்னை சித்தவித்தை அப்பியாச நிலைய அறக்கட்டளையை பதிவு செய்து நிர்வகித்துவருகின்றனர். பெரம்பூர், அண்ணாநகர் தற்போது வண்ணாரப்பேட்டை தட்சீணாமூர்த்தி ஜீவ சமாதி உள்ள இடத்தில் தொடர்ந்து வாரம் வாரம் கூட்டு ஜெபம் அப்பியாசம் செய்து வருகின்றனர். தற்போது தட்சீணாமூர்த்தி ஜீவசமாதி உள்ள கோவிலில் இலவசமாக சித்தவித்தையை போதித்து உபதேசமும் வழங்கப்பட்டு வருகிறது. இவ்வாறு பிரம்மஶ்ரீ. கோதண்டவேலு அய்யா அவர்கள் தொடர்து தனது பணியையும், சேவையையும் செய்து கணக்கற்ற வித்தியார்த்திகளை உருவாக்கி வருகின்றனர். 
              வித்தை அளிக்கப்பட்டவரின் எண்ணிக்கை: 1000 நபர்களுக்கும் மேல் மொத்த விழாக்கள்: 22 ஆண்டு விழா பங்கு கொண்ட மத்தம விவாகம்: சுமார் 100-க்கும் மேல்
              நலத்திட்ட உதவிகள்: பள்ளி மாணவர்கள், திருநங்கைகள், கண்பார்வையற்றவர்கள், முதியோர் (சுமார் 1000-க்கும் மேற்பட்டோர்)
              இனியும் பணி தொடரும்…..
            </p>
            <button id="close-details" className="bg-[#994D1C] text-white py-2 px-4 rounded hover:text-black hover:bg-white font-bold">Close</button>
          </div>
        </div>
      </div>

      <div className="Homepage-scrollable-image relative overflow-hidden w-full my-6">
        <div className="slider flex transition-transform duration-500">
          <div className="slides flex">
            <div className="slide min-w-full"><img src={thImg3} alt="Image 3" className="w-full h-auto" /></div>
            <div className="slide min-w-full"><img src={thImg4} alt="Image 4" className="w-full h-auto" /></div>
            <div className="slide min-w-full"><img src={thImg5} alt="Image 5" className="w-full h-auto" /></div>
            <div className="slide min-w-full"><img src={thImg6} alt="Image 6" className="w-full h-auto" /></div>
            <div className="slide min-w-full"><img src={thImg7} alt="Image 7" className="w-full h-auto" /></div>
          </div>
        </div>
      </div>

 <div className="about-section bg-[#f6ae6f] mt-2 p-8 md:p-8 rounded-10xl shadow-lg my-10 mx-auto max-w-6xl hover:scale-105 duration-500">
        <div className="about-container flex flex-col md:flex-row md:justify-between items-center md:space-x-4">
          <div className="about-image flex-1 mb-4 md:mb-0 max-w-full flex justify-center">
            <img src={rightHand} alt="Philosophy of Iswara" className="w-full max-w-xs h-auto rounded-md hover:scale-105 duration-500" />
          </div>
          <div className="about-details flex-1 text-justify p-5 text-white">
            <h1 className="text-3xl font-bold text-center md:text-left text-white">Philosophy of Iswara</h1>
            <p className="mt-10">
              <strong className="text-xl">"Gnanameiyum Iswara" –</strong>What is philosophy of Iswara? There is hardly anyone in this world who do not speak or question about Iswara Philosophy. Nobody knows, who Iswara is, and how does he look like. While this is so in the name of Iswara pooja (worship), many are engaged in poojas, oblations and rituals in many methods. But without knowing Iswara how can we perform pooja? Is there any fruit for such poojas performed?There won't be any benefit if we worship without knowing Iswara or Philosophy of Iswara. For example: If we have to take a favour from a person, we have to know him and submit ourselves. Without knowing him, if we submit, at times it may give room for danger.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section bg-[#f6ae6f] mt-2 p-8 md:p-8 rounded-10xl shadow-lg my-10 mx-auto max-w-6xl hover:scale-105 duration-500">
        <div className="about-container flex flex-col md:flex-row md:justify-between items-center md:space-x-4">
          <div className="about-image flex-1 mb-4 md:mb-0 max-w-full flex justify-center">
            <img src={guru} alt="Concept of Guru" className="w-full max-w-xs h-auto rounded-md hover:scale-105 duration-500" />
          </div>
          <div className="about-details flex-1 text-justify p-5 text-white">
            <h1 className="text-3xl font-bold text-center md:text-left text-white">Concept of Guru</h1>
            <p className="mt-10">
              There are very few in this world who have not come across the word "Guru" (Preceptor). But people who have known who is Guru are very little. Without knowing the concept of Guru, how can one worship Guru? Who is a Guru? Without mind, there is no work, Brahma, or world. That is, why it is said that the mind is the cause for Bandha- Moksha and there is no such thing as Guru-Sishya. One's mind is one's own Guru.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section bg-[#f6ae6f] mt-2 p-8 md:p-8 rounded-10xl shadow-lg my-10 mx-auto max-w-6xl hover:scale-105 duration-500">
        <div className="about-container flex flex-col md:flex-row md:justify-between items-center md:space-x-4">
          <div className="about-image flex-1 mb-4 md:mb-0 max-w-full flex justify-center">
            <img src={jeeva} alt="Jeeva Karunyam" className="w-full max-w-xs h-auto rounded-md hover:scale-105 duration-500" />
          </div>
          <div className="about-details flex-1 text-justify p-5 text-white">
            <h1 className="text-3xl font-bold text-center md:text-left text-white">Jeeva Karunyam</h1>
            <p className="mt-10">
              People today talk about Benevolence to living beings-jeeva karunya but actually, they do not know what exactly jeeva karunya is. There is a saying "Ahimsa Paramo Dhamah". But no one either thinks about it or practices it. What is jeeva karunya? We can definitely say 'none'. The jeeva is not even worth a small coin. The necessity of money is for happy living. But without jeeva, life can't be enjoyed. Moreover, we are having that blemishless jeeva. Subside the Jeeva in your own self, which is being destroyed, become a Sanmargi and a Vishesha Jnani. Jeeva Karunya is, making mani out of the suklam our brahma wealth, the Agniswaroopa by blowing with the vayu, the Jeeva, removing the Jalamsam, and gaining holy treasures and bliss.
            </p>
          </div>
        </div>
      </div>

      {/* New Section */}
      <div className="about-section bg-[#f6ae6f] p-8 md:p-12 rounded-lg shadow-lg my-8 mx-auto max-w-6xl hover:scale-105 duration-500">
        <div className="about-container flex flex-col md:flex-row md:justify-between items-center md:space-x-4">
          <div className="about-image flex-1 hover:scale-105 duration-500">
            <img src={thImg7} alt="About Image" className="w-full h-auto rounded-md" />
          </div>
          <div className="about-details flex-1 text-justify p-4 text-white">
            <h1 className="text-2xl font-bold text-center md:text-left">Religion</h1>
            <p className="mt-4">
              1. There is no other religion in the world save the single one, the Iswara Matham (Religion of God) <br />
              2. In the Indu Matam, Indu means Chandra. Matam means establishing. What ought to be established is the Chandra. Chandra means mind. Hence Indu Matam is establishing the Chandra, the mind, in Jeeva, the Iswara. <br />
              3. At a time when people were ignorant of such kind of religion, one Great Man called Buddha came, discovered the principles of Iswara Matam, and established the right path to contemplate and worship God. He became the priest for that. Since the Buddha, the Great, the priest, established, as per his name, it was named after Buddhism. What he established is not Buddhism, but Iswara Matam itself. <br />
              4. Likewise also at one time came one Great Man named Christ and established just and single path to worship God. That was Iswara Matam.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer bg-[#994D1C] text-white p-6 text-center">
        <div className="footer-content flex flex-wrap justify-around">
          <div className="flex-1 m-2">
            <p>பிரம்மஶ்ரீ. கோதண்டவேலு அய்யா</p>
            <p>பொதுச் செயலாளர்</p>
            <p>9884724712</p>
          </div>
          <div className="flex-1 m-2">
            <p>பிரம்மஶ்ரீ. ஜெகதீசன்</p>
            <p>உப தலைவர்</p>
            <p>9840347179</p>
          </div>
          <div className="flex-1 m-2">
            <p>பிரம்மஶ்ரீ. இரவிச்சந்திரன்</p>
            <p>விழாக்குழு தலைவர்</p>
            <p>9840892408</p>
          </div>
        </div>
        <p className="rights text-sm mt-4">&copy; 2024 Chennai Siddhavidhai Trust. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;