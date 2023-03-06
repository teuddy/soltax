import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer/Footer";
const { motion, AnimatePresence } = require("framer-motion");

const MainLayout = () => {
  //state for animations
  const [showBox, setShowBox] = useState(false);
  const [boxExited, setBoxExited] = useState(false);
  //state for country of importation
  const [country, setCountry] = useState("");
  //creating tax obj
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedChassis, setSelectedChassis] = useState(null);

  const toggleBox = (event) => {
    setCountry(event.target.name);
    setShowBox((prev) => !prev);
    setBoxExited((prev) => !prev);
    //get the brans when the toggle buttons is clicked
    fetch("/api/carbrands/")
      .then((res) => res.json())
      .then((res) => setBrands(res))
      .catch(console.error);
  };
  const handleBrandChange = (event) => {
    setSelectedBrandId(event.target.value);
    setSelectedModelId(null);
  };
  const handleModelChange = (event) => {
    setSelectedModelId(event.target.value);
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleVersionChange = (event) => {
    setSelectedVersion(event.target.value);
  };
  const handleChassisChange = (event) => {
    setSelectedChassis(event.target.value);
  };

  const selectedBrand = brands.find((brand) => brand.id == selectedBrandId);
  const selectedModel =
    selectedBrand &&
    selectedBrand.models.find((model) => model.id == selectedModelId);

  useEffect(() => {
    setShowBox(true);
    setBoxExited(false);
  }, []);

  const getData = () => {
    //if states are empty then return ternary

    if (
      !selectedBrand ||
      !selectedModel ||
      !selectedYear ||
      !selectedVersion ||
      !selectedChassis
    ) {
      return;
    }
    console.log("getting data");
    setBoxExited((prev) => !prev);
    console.log({
      country,
      brand: selectedBrand.brand,
      model: selectedModel.name,
      year: selectedYear,
      version: selectedVersion,
      chasis: selectedChassis,
    });
  };

  return (
    <motion.div className="h-screen w-screen flex flex-col items-center p-8 bg-[#2980b9]">
      {/*CONTAINER OF THE SUN*/}
      <div className="flex justify-center">
        <motion.svg
          className=" svg-sun"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          version="1.1"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMinYMin meet"
        >
          <circle cx="50" cy="50" r="35" id="sun"></circle>
        </motion.svg>
      </div>
      {/*---------------------------*/}

      {/*CONTAINER OF THE SECOND FORM */}
      {boxExited && (
        <AnimatePresence>
          <motion.div
            className="absolute mt-[150px] rounded-3xl p-6 f shadow-xl bg-white w-[85%] "
            key="message"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0, transition: { duration: 0.5 } }}
          >
            <div className="flex justify-center flex-col gap-y-6">
              <p className="text-[20px] text-center">
                Impuestos para:{" "}
                <b>{country === "usa" ? "EE.UU 🇺🇸" : "Europa 🇪🇺"}</b>
              </p>
              <div className="flex gap-x-4">
                <div className="w-[100%]">
                  <label>
                    <p>Elige la marca: </p>
                  </label>
                  <select
                    required
                    data-te-select-init
                    className="w-[100%] h-[40px]"
                    onChange={handleBrandChange}
                  >
                    {brands.map((brand) => {
                      return (
                        <option key={brand.id} value={brand.id}>
                          {brand.brand}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-[100%]">
                  <label>
                    <p>Elige el modelo: </p>
                  </label>
                  <select
                    required
                    data-te-select-init
                    className="w-[100%] h-[40px]"
                    onChange={handleModelChange}
                  >
                    {selectedBrand &&
                      selectedBrand.models.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-x-4">
                <div className="w-[100%]">
                  <label>
                    <p>Elige el año: </p>
                  </label>
                  <select
                    data-te-select-init
                    className="w-[100%] h-[40px]"
                    onChange={handleYearChange}
                  >
                    {selectedModel &&
                      selectedModel.years.map((year) => (
                        <option key={year} value={year.id}>
                          {year}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="w-[100%]">
                  <label>
                    <p>Elige la versión: </p>
                  </label>
                  <select
                    data-te-select-init
                    className="w-[100%] h-[40px]"
                    onChange={handleVersionChange}
                  >
                    {selectedModel &&
                      selectedModel.versions.map((version) => (
                        <option key={version} value={version.id}>
                          {version}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="w-[100%]">
                <label>
                  <p>No. chásis</p>
                </label>
                <select
                  data-te-select-init
                  className="w-[100%] h-[40px]"
                  onChange={handleChassisChange}
                >
                  <option value="usa">CHASIS (1,4,5,7) AMERICANO</option>
                  <option value="canada">CHASIS (2) CANADA</option>
                  <option value="mex">CHASIS (3) MÉXICO</option>
                  <option value="korea">CHASIS (K) KOREA</option>
                  <option value="japan">CHASIS (J) JAPÓN</option>
                </select>
              </div>
              <button
                className="bg-black text-white rounded-full p-2"
                onClick={getData}
              >
                Impuestos
              </button>
              <div className="bg-red-500"></div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {/*---------------------------*/}

      {!boxExited && !showBox ? (
        <AnimatePresence>
          <motion.div
            className="absolute mt-[150px] rounded-3xl p-6 f shadow-xl bg-white  w-[85%] "
            key="message"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0, transition: { duration: 0.5 } }}
          >
            <div className="mb-4">
              <p className="text-[20px] font-bold text-center">
                FORD F-150 2022
              </p>
            </div>
            <div className=" flex flex-col gap-y-4 text-center mt-8">
              <p>
                <b>Impuesto:</b> 123,000 DOP$
              </p>
              <p>
                {" "}
                <b>Playa y Marbete:</b> 131,900 DOP$
              </p>
              <p>
                <b>Gravamen: </b> No aplica ❌
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        ""
      )}

      {/*CONTAINER OF THE FIRST FORM */}
      <AnimatePresence>
        {showBox && (
          <motion.div
            key="box"
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
          >
            <div className="flex ">
              <motion.p
                className="mb-4 text-white text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Más de <b>120+</b> registros de impuestos en vehiculos
                extranjeros a Republica Dominicana!
              </motion.p>
            </div>

            <motion.div
              className=" h-[200px] rounded-3xl p-6 flex justify-center flex-col gap-y-6 shadow-xl bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <div className=" flex flex-col gap-y-2 ">
                <div className="w-full">
                  <motion.button
                    className="w-full bg-slate-900 text-white rounded-lg p-2 "
                    whileTap={{ scale: 0.8 }}
                    name="usa"
                    transition={{ duration: 0.2 }}
                    onClick={toggleBox}
                  >
                    Estados Unidos &#x1F1FA;&#x1F1F8;
                  </motion.button>
                </div>
                <div className="w-full">
                  <motion.button
                    className="w-full bg-yellow-500 text-white rounded-lg p-2 "
                    whileTap={{ scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    name="europa"
                    onClick={toggleBox}
                  >
                    Europa 🇪🇺
                  </motion.button>
                </div>
              </div>
              <p className="text-center text-sm">
                From Dominicans to <b>Dominicans</b>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/*---------------------------*/}
      {/*CONTAINER OF THE SECOND FORM */}

      <Footer />
    </motion.div>
  );
};

export default MainLayout;
