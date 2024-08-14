import { Sidebar } from "@/components";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const router = useRouter();
  const hideForRoutes = ["/login", "/register"];

  return (
    <div className="container h-100 p-0 m-0 " style={{ minWidth: "100%" }}>
      {!hideForRoutes.includes(router.pathname) ? (
        <div className="main-div h-100 d-flex flex-row m-0">
          <div className="" style={{ minHeight: "100%" }}>
            <Sidebar />
          </div>
          <div className="w-100">
            <Component {...pageProps} />
          </div>
        </div>
      ) : (
        <div className="w-100 h-100">
          <Component {...pageProps} />
        </div>
      )}
    </div>
  );
}

export default MyApp;
