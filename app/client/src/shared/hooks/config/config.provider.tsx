import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ConfigContext } from "./config.context";
import { LoaderComponent } from "shared/components";
import { ConfigTypes } from "shared/types";

type ConfigProps = {
  children: ReactNode;
};

export const ConfigProvider: React.FunctionComponent<ConfigProps> = ({
  children,
}) => {
  const configRef = useRef<ConfigTypes>(null);

  const [loadingMessage, setLoadingMessage] = useState<string>(
    "Loading configuration...",
  );

  useEffect(() => {
    fetch("/info")
      .then((response) => response.json())
      .then(async ({ data: config }) => {
        configRef.current = config;

        setLoadingMessage(null);
      })
      .catch(() => {
        setLoadingMessage("Server is not reachable!");
      });
  }, [setLoadingMessage]);

  const getConfig = useCallback(() => configRef.current, []);

  const isDevelopment = useCallback(
    () => configRef.current.version === "development",
    [],
  );

  return (
    <ConfigContext.Provider
      value={{
        getConfig,

        isDevelopment,
      }}
      children={
        <LoaderComponent message={loadingMessage} children={children} />
      }
    />
  );
};
