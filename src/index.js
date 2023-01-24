import { createSignal, onCleanup } from "solid-js";
let i18nextInstance;

export const initSolidI18next = {
    type: "3rdParty",
    init: (instance) => {
        i18nextInstance = instance;
    }
};
export const useTranslation = (ns) => {
    return {
        t: (key, props = {}) => {
            const [ translation, setTranslation ] = createSignal("");

            function setLanguage(lng) {
                setTranslation(i18nextInstance.getFixedT(lng, ns)(key, props));
            };

            i18nextInstance.on("loaded", () => setLanguage(i18nextInstance.language));
            i18nextInstance.on("languageChanged", setLanguage);
            onCleanup(setLanguage);

            return translation;
        }
    }
};