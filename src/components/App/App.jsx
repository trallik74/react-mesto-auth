import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Content from "../Content/Content";
import { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import Register from "../Register/Register";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import UpdateDataNotification from "../UpdateDataNotification/UpdateDataNotification";
import { checkToken } from "../../utils/auth";
import errorHandler from "../../utils/errorHandler";
import { IsLoadingContext } from "../../context/IsLoadingContext";

export default function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tooltipData, setTooltipData] = useState({
    isOpen: false,
    isCorrect: false,
    message: "",
  });
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    correct: true,
    message: "Успешно",
  });
  const [timerId, setTimerId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate("/", { replace: true });
            setEmail(res.data.email);
          }
        })
        .catch((err) => {
          errorHandler(err);
          setIsLoggedIn(false);
          navigate("/sign-in", { replace: true });
          setEmail("");
        });
    }
  };

  function handleTooltipClose() {
    setTooltipData((data) => ({ ...data, isOpen: false }));
  }

  function onNotificationOpen() {
    setIsNotificationOpen(true);

    if (timerId) {
      clearTimeout(timerId);
    }

    setTimerId(
      setTimeout(() => {
        setIsNotificationOpen(false);
        setTimerId("");
      }, 3000)
    );
  }

  function handleNotification({ message, isCorrect }) {
    onNotificationOpen();
    setNotificationSettings({
      ...notificationSettings,
      correct: isCorrect,
      message,
    });
  }

  function handleNotificationClose() {
    setIsNotificationOpen(false);
    clearTimeout(timerId);
    setTimerId("");
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

  return (
    <>
      <IsLoadingContext.Provider value={[isLoading, setIsLoading]}>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Content}
                isLoggedIn={isLoggedIn}
                handleNotification={handleNotification}
                email={email}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                setTooltipData={setTooltipData}
                handleLogin={handleLogin}
                setEmail={setEmail}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                setTooltipData={setTooltipData}
                handleNotification={handleNotification}
              />
            }
          />
        </Routes>
      </IsLoadingContext.Provider>

      <InfoTooltip
        isOpen={tooltipData.isOpen}
        isCorrect={tooltipData.isCorrect}
        message={tooltipData.message}
        onClose={handleTooltipClose}
      />
      {isNotificationOpen && (
        <UpdateDataNotification
          onClose={handleNotificationClose}
          settings={notificationSettings}
        />
      )}
    </>
  );
}
