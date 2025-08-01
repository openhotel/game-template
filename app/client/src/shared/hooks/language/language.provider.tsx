import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { LoaderComponent } from "shared/components";
import { LanguageContext } from "./language.context";
import { useConfig } from "shared/hooks";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import i18next from "i18next";
import { Language } from "shared/enums/language.enumts";

type ConfigProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FunctionComponent<ConfigProps> = ({
  children,
}) => {
  const { isDevelopment } = useConfig();

  const [loadingMessage, setLoadingMessage] = useState<string>(
    "Loading languages...",
  );

  useEffect(() => {
    i18next
      .use(HttpBackend)
      .use(initReactI18next)
      .init({
        debug: isDevelopment(),
        fallbackLng: Language.EN,
        supportedLngs: Object.values(Language),
        detection: {
          order: ["localStorage"],
          caches: ["localStorage"],
          lookupLocalStorage: "lang",
        },
        backend: {
          loadPath: "locales/{{lng}}.json",
        },
      });

    i18next
      .changeLanguage(localStorage.getItem("lang") ?? Language.EN)
      .then(() => {
        setLoadingMessage(null);
      });
  }, [isDevelopment, setLoadingMessage]);

  const changeLanguage = useCallback(async (language: string) => {
    await i18next.changeLanguage(language);
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        changeLanguage,
      }}
      children={
        <LoaderComponent message={loadingMessage} children={children} />
      }
    />
  );
};
