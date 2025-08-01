import React, { useState } from "react";
import "./Contact.css";
import emailjs from "emailjs-com";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
import { fr } from "date-fns/locale";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from '@mui/icons-material/Close';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const fakeCreneaux = {
  "2025-08-02": ["10h00", "11h00", "14h00"],
  "2025-08-03": ["09h00", "15h00"],
  "2025-08-04": ["10h00", "13h00", "16h00"],
  "2025-09-10": ["10h00", "11h00"],
  "2025-09-15": ["14h00", "16h00"],
};

const Contact = () => {
  const [popupEnvoieVisible, setPopupEnvoieVisible] = useState(false);
  const [popupEnvoieClass, setPopupEnvoieClass] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    reason: "",
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCreneau, setSelectedCreneau] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Ce champ est requis.";
    if (!formData.email.trim()) newErrors.email = "Ce champ est requis.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Ce champ est requis.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Numéro invalide (10 chiffres).";
    }
    if (!formData.message.trim()) newErrors.message = "Ce champ est requis.";
    if (!formData.reason) newErrors.reason = "Veuillez choisir une raison.";
    if (!selectedDate) newErrors.date = "Veuillez choisir une date.";
    if (!selectedCreneau) newErrors.creneau = "Veuillez choisir un créneau.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateFields()) return;

    const { name, email, phone, message, reason } = formData;
    const date = format(selectedDate, "dd/MM/yyyy", { locale: fr });

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          name,
          email,
          phone,
          message,
          date,
          creneau: selectedCreneau,
          reason,
        },
        "YOUR_USER_ID"
      )
      .then(
        () => {
          setPopupEnvoieClass("popupenvoie-success");
          setPopupEnvoieVisible(true);
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            reason: "",
          });
          setSelectedDate(null);
          setSelectedCreneau("");
          setErrors({});
        },
        () => {
          setPopupEnvoieClass("popupenvoie-erreur");
          setPopupEnvoieVisible(true);
        }
      );
  };

  const getCreneauxForDate = () => {
    if (!selectedDate) return [];
    const key = format(selectedDate, "yyyy-MM-dd");
    return fakeCreneaux[key] || [];
  };

  const isDayAvailable = (date) => {
    const key = format(date, "yyyy-MM-dd");
    return !!fakeCreneaux[key];
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const dayLabels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    const calendarDays = [];

    const firstDayIndex = format(monthStart, "i", { locale: fr }) - 1;
    for (let i = 0; i < firstDayIndex; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day-empty"></div>);
    }

    days.forEach((day) => {
      const isAvailable = isDayAvailable(day);
      const isSelected = selectedDate && isSameDay(selectedDate, day);
      const isCurrentMonth = isSameMonth(day, currentMonth);
      const isPast = day < new Date().setHours(0, 0, 0, 0);

      calendarDays.push(
        <button
          key={format(day, "yyyy-MM-dd")}
          className={`calendar-day ${isAvailable && isCurrentMonth && !isPast ? "available" : "unavailable"} ${isSelected ? "selected" : ""} ${isToday(day) ? "today" : ""}`}
          onClick={() => {
            if (isAvailable && isCurrentMonth && !isPast) {
              setSelectedDate(day);
              setSelectedCreneau("");
            }
          }}
          disabled={!isAvailable || !isCurrentMonth || isPast}
        >
          {format(day, "d")}
        </button>
      );
    });

    return (
      <>
        {dayLabels.map((label) => (
          <div key={label} className="day-label">
            {label}
          </div>
        ))}
        {calendarDays}
      </>
    );
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="container_page_contact">
      {popupEnvoieVisible && (
        <div className={`popupenvoie ${popupEnvoieClass}`}>
          <div className="popupenvoie__content">
            <img
              src="/img/fleur_pop.png"
              alt="Image florale"
              className="popupenvoie__image"
            />
            <h2 className="popupenvoie__title">MERCI</h2>
            <p className="popupenvoie__description">
              {popupEnvoieClass === "popupenvoie-success"
                ? "Nous avons bien reçu votre demande avec la date et le créneau choisis."
                : "Erreur lors de l'envoi du message. Veuillez réessayer."}
            </p>
            <div className="popupenvoie__buttons">
              <button
                onClick={() => (window.location.href = "/")}
                className="popupenvoie__button retour"
              >
                Retour au menu
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="img_contact">
        <img
          src={process.env.PUBLIC_URL + "/img/chien contact.jpeg"}
          alt="Chien contact"
        />
      </div>

      <div className="div_container_contact">
        <div className="container_form">
          <h1 className="h1_contact">Contactez-nous</h1>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "100%",
                maxWidth: "500px",
                display: "flex",
                margin: "0 auto 1rem auto",
              },
              "& .MuiInputLabel-root": {
                color: "black",
                "&.Mui-focused": {
                  color: "#778d45",
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                },
                "&:hover fieldset": {
                  borderColor: "#778d45",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#778d45",
                },
              },
              "& .MuiFormControl-root": {
                width: "100%",
                maxWidth: "500px",
                margin: "0 auto 1rem auto",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              name="name"
              label="Nom complet"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name || " "}
              variant="outlined"
            />

            <TextField
              required
              name="email"
              label="Adresse email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email || " "}
              variant="outlined"
            />

            <TextField
              required
              name="phone"
              label="Téléphone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone || " "}
              variant="outlined"
            />

            <FormControl
              sx={{
                m: 1,
                width: "100%",
                maxWidth: "500px",
                margin: "0 auto 1rem auto",
              }}
              error={!!errors.reason}
              required
            >
              <InputLabel id="reason-label">Raison du rendez-vous</InputLabel>
              <Select
                labelId="reason-label"
                id="reason-select"
                value={formData.reason}
                label="Raison du rendez-vous"
                onChange={handleChange}
                name="reason"
              >
                <MenuItem value="">
                  <em>Choisir une raison</em>
                </MenuItem>
                <MenuItem value="Rendez-vous">Rendez-vous</MenuItem>
                <MenuItem value="Visite">Visite</MenuItem>
                <MenuItem value="École">École</MenuItem>
                <MenuItem value="Autre">Autre</MenuItem>
              </Select>
              {errors.reason && (
                <p className="error-text" style={{ margin: "3px 14px 0" }}>
                  {errors.reason}
                </p>
              )}
            </FormControl>

            <div className="calendar-input-container">
              <TextField
                label="Date de rendez-vous"
                variant="outlined"
                value={selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: fr }) : ""}
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                InputProps={{ readOnly: true }}
                error={!!errors.date}
                helperText={errors.date || " "}
              />
              {isCalendarOpen && (
                <div className="calendar-popup">
                  <button type="button" className="close-calendar-btn" onClick={() => setIsCalendarOpen(false)}>
                    <CloseIcon />
                  </button>
                  <div className="calendar-header">
                    <button type="button" onClick={prevMonth} className="calendar-nav-btn">
                      <ArrowBackIosIcon fontSize="small" />
                    </button>
                    <span className="calendar-title">
                      {format(currentMonth, "MMMM yyyy", { locale: fr })}
                    </span>
                    <button type="button" onClick={nextMonth} className="calendar-nav-btn">
                      <ArrowForwardIosIcon fontSize="small" />
                    </button>
                  </div>
                  <div className="calendar-days-container">
                    {renderDays()}
                  </div>
                </div>
              )}
            </div>

            {selectedDate && (
              <div className="creneaux-wrapper">
                <label>Créneaux disponibles :</label>
                <div className="creneaux-list">
                  {getCreneauxForDate().map((creneau) => (
                    <button
                      key={creneau}
                      type="button"
                      className={`creneau-btn ${selectedCreneau === creneau ? "selected" : ""}`}
                      onClick={() => setSelectedCreneau(creneau)}
                    >
                      {creneau}
                    </button>
                  ))}
                </div>
                {errors.creneau && <p className="error-text">{errors.creneau}</p>}
              </div>
            )}

            <TextField
              required
              name="message"
              label="Votre message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message || " "}
              variant="outlined"
            />

            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#778d45",
                "&:hover": {
                  backgroundColor: "#5a6b35",
                },
                display: "flex",
                margin: "1.5rem auto",
                width: "200px",
              }}
            >
              Envoyer
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Contact;