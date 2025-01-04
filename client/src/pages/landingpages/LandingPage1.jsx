import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { getSingleLinkForLandingWithIdAndUniqueId } from "../../utils/Api";
import LandingForm1 from "./LandingForm1";

const LandingPage1 = () => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const ref = params.get("ref");
      const rewrite = params.get("rewrite");

      try {
        const validateLink = await fetchOldData(rewrite, ref);
        if (!validateLink?.link) {
          window.location.href = "/404";
        } else {
          if (ref) {
            Cookies.set("referral", ref, { expires: 30 });
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          window.location.href = "/404";
        } else {
          console.error("Error fetching data:", error);
          // Handle other types of errors if necessary
        }
      }
    };

    fetchData();
  }, [location]);

  const fetchOldData = async (id, uniqueId) => {
    return await getSingleLinkForLandingWithIdAndUniqueId({ id, uniqueId });
  };

  return (
    <>
      <section>
        <div className="div">
          <div className="div-2">
            <div className="div-3">
              <img src="./logo.png" alt="logo" className="img1" />
            </div>
            <div className="div-4"></div>
          </div>
          {/* <div className="div-5"> */}

          <iframe
            className="div-5"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/1D8yL13DM-U?autoplay=1&si=RS20WzOYM-G5tYko"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          {/* </div> */}
          <button className="div-6" onClick={handleOpen}>
            Register Now
          </button>
        </div>
      </section>

      <section>
        <div className="div2">
          <div className="div-2">
            <div className="div-3">
              <img src="./logo.png" alt="logo" className="img1" />
            </div>
            <div className="div-4"></div>
          </div>
          <div className="div2-5">
            <div className="div2-6">
              <div className="column">
                <img
                  loading="lazy"
                  alt="rank"
                  src="./rank.png"
                  className="img-2"
                />
              </div>
              <div className="column-2">
                <div className="div2-7">
                  <div className="div2-8">
                    Ranked 6th in India
                    <br />
                    By Times In Top Emerging B-Schools
                  </div>
                  <div className="div2-9">
                    In a shorth span of 3 years DMTIMS has received many
                    Recognitions for its continuous Accomplishments in the field
                    of Higher Education.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="div2-10">MBA for Working Professionals</div>
          <div style={{ width: "80%" }}>
            <div className="div2-11">
              <div>
                <img
                  className="clock"
                  src="./clock.png"
                  alt="clock"
                  style={{
                    height: "87px",
                    width: "87px",
                    borderRadius: "20px",
                  }}
                />
              </div>
              <div>Work on Weekdays and Study on the Weekend</div>
            </div>
            <div className="div2-12">
              <div>
                <img
                  src="./cap.png"
                  alt="cap"
                  style={{
                    height: "87px",
                    width: "87px",
                    borderRadius: "20px",
                  }}
                />
              </div>
              <div>International MBA + AICTE Approved PGDM</div>
            </div>

            <div className="div2-13">
              <div>
                <img
                  src="./books.png"
                  alt="cap"
                  style={{
                    height: "87px",
                    width: "87px",
                    borderRadius: "20px",
                  }}
                />
              </div>
              <div>Syllabus devised by Industry Experienced Faculty</div>
            </div>
            <div className="div2-14">
              <div>
                <img
                  src="./360.png"
                  alt="cap"
                  style={{
                    height: "87px",
                    width: "87px",
                    borderRadius: "20px",
                  }}
                />
              </div>
              <div>All round Development by Industry Experts</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="div3">
          <div className="div-2">
            <div className="div-3">
              <img loading="lazy" alt="logo" src="./logo.png" className="img" />
            </div>
            <div className="div-4"></div>
          </div>
          <div className="div3-5">
            Seats filling out fast! Register and
            <br />
            Finalize your seat at DMTIMS
          </div>
          <div className="div3-6">
            Obtaining a dual degree in PGDM (Postgraduate Diploma in Management
            Studies) and International MBA (Master of Business Administration)
            from AICTE & a QS 5 Star European University offers a unique and
            comprehensive educational experience that can significantly enhance
            the career prospects and overall skill set of management students.
          </div>
          <div className="div3-7">DMTIMS +EIU</div>
          <div className="div3-8">
            <div className="image1">
              <img
                src="./logonew.png"
                alt="logo1"
                style={{ maxWidth: "500px", maxHeight: "170px" }}
              />
              <img
                src="./aicte.png"
                alt="logo2"
                style={{ maxWidth: "70px", maxHeight: "70px" }}
              />
              <img
                src="./aims.png"
                alt="logo3"
                style={{ maxWidth: "160px", maxHeight: "100px" }}
              />
              <img
                src="./acbsp.png"
                alt="logo4"
                style={{ maxWidth: "100px", maxHeight: "115px" }}
              />
            </div>
            <div className="plus">
              <img
                src="./plus.png"
                alt="plus"
                style={{ maxWidth: "70px", maxHeight: "70px" }}
              />
            </div>
            <div className="image2">
              <img
                src="./eiu.png"
                alt="logo5"
                style={{ maxWidth: "500px", maxHeight: "170px" }}
                className="eiu"
              />
              <img
                src="./qs.png"
                alt="logo6"
                style={{ maxWidth: "250px", maxHeight: "90px" }}
              />
              <img
                src="./asic.jpeg"
                alt="logo7"
                style={{ maxWidth: "210px", maxHeight: "70px" }}
              />
              <img
                src="./acbsp2.png"
                alt="logo8"
                style={{ maxWidth: "80px", maxHeight: "70px" }}
              />
            </div>
          </div>
        </div>
      </section>
      <LandingForm1 open={open} handleClose={handleClose} />
    </>
  );
};

export default LandingPage1;
