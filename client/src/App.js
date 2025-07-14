import React, { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoutes';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import HomePage from './components/Pages/Homepage/HomePage';
import Apropos from './components/Pages/Propos/Apropos';
import Galeriechien from './components/Pages/Animaux/Chiens/Galeriechien';
import Galeriechat from './components/Pages/Animaux/Chats/Galeriechat';
import Contact from './components/Pages/Formulaires/Contact/Contact';
import Equipe from './components/Pages/Equipe/Equipe';
import Ficheperso_animal from './components/Pages/Fiche_perso/Ficheperso_animal';
import Partenaires from './components/Pages/Partenaires/Partenaires';
import Connexion from './components/Pages/Profil/Connexion/Connexion';
import MotpasseOublie from './components/Pages/Profil/Oublie/Motpasse_oublie';
import Inscription from './components/Pages/Profil/Inscription/Inscription';
import Adoption from './components/Pages/Formulaires/Adoptions/Adoption';
import Conditions_adoption from './components/Pages/Conditions/Conditions_adoption';
import Savoir from './components/Pages/Savoir/Savoir';
import Cruaute from './components/Pages/Cruauté/Cruaute';
import Compagnons_adopter from './components/Pages/Adoptés/Compagnons_adopter';
import Mon_compte from './components/Pages/Profil/Compte/Mon_compte';
import Accueil_animaux from './components/Pages/Accueil/Accueil_animaux';
import Sensibilisation from './components/Pages/Sensibilisation/Sensibilisation';
import Adhesions from './components/Pages/Adhésions/Adhesions';

import BackButton from './components/Widgets/Back_button/Back_button';
import Animalitem from './components/Widgets/Animal_item/Animalitem';
import PopupMenu from './components/Widgets/Popup_menu/PopupMenu';
import Filtre from './components/Widgets/Filtres/Filtre';
import Pagination from './components/Widgets/Pagination/Pagination';
import Carte_carrousel from './components/Widgets/Carrousel/Carte_carrousel';
import Scroll_button from './components/Widgets/Scroll_button/Scroll_button';
import Back_office from './components/back_office/Back_office';
import CommentCards from './components/Pages/Avis/Avis';
import GestionAdoption from './components/Pages/Gestion_adoption/Gestion_adoption';
import Loading from './components/Widgets/Loading/Loading';


import AdoptionChiens from './components/Pages/PageAdoption/Page_chiens/AdoptionChiens';

import Page404 from './components/Widgets/404Page/Page_404';

const Layout = ({ children }) => {
  const location = useLocation();
  const noNavbarFooter = ["/connexion", "/inscription", "/motpasseoublie"].includes(location.pathname.toLowerCase());

  return (
    <>
      {!noNavbarFooter && <Navbar />}
      {noNavbarFooter && <BackButton />}
      {children}
      {!noNavbarFooter && <Footer />}
    </>
  );
};

const App = () => {
  const [siteReady, setSiteReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/animaux`);
        if (!res.ok) throw new Error("Erreur API");
        await res.json();
        setSiteReady(true);
      } catch (err) {
        console.error("Erreur au chargement du site :", err);
      }
    };

    init();
  }, []);

  if (!siteReady) return <Loading />;

  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/Apropos" element={<Apropos />} />
            <Route path="/Galeriechien" element={<Galeriechien />} />
            <Route path="/Galeriechat" element={<Galeriechat />} />
            <Route path="/Nos partenaires" element={<Partenaires />} />
            <Route path="/Ficheperso_animal/:id" element={<Ficheperso_animal />} />
            <Route path="/Animalitem" element={<Animalitem />} />
            <Route path="/Notre équipe" element={<Equipe />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Connexion" element={<Connexion />} />
            <Route path="/MotpasseOublie" element={<MotpasseOublie />} />
            <Route path="/Inscription" element={<Inscription />} />
            <Route path="/Formulaire d'adoption" element={<Adoption />} />
            <Route path="/Conditions d'adoption" element={<Conditions_adoption />} />
            <Route path="/Ce qu'il faut savoir" element={<Savoir />} />
            <Route path="/Témoin de cruauté" element={<Cruaute />} />
            <Route path="/Carte" element={<Carte_carrousel />} />
            <Route path="/Nos compagnons adoptés" element={<Compagnons_adopter />} />
            <Route path="/L'accueil des animaux" element={<Accueil_animaux />} />
            <Route path="/Sensibilisation" element={<Sensibilisation />} />
            <Route path="/Adhésions" element={<Adhesions />} />
            <Route path="/gestion_adoption" element={<GestionAdoption />} />
            <Route path="/AdoptionChiens" element={<AdoptionChiens />} />

            <Route path="/Mon compte" element={
              <PrivateRoute>
                <Mon_compte />
              </PrivateRoute>
            } />

            <Route path="/Back_office" element={
              <AdminRoute>
                <Back_office />
              </AdminRoute>
            } />

            <Route path="*" element={<Page404 />} />
          </Routes>
          <Scroll_button />
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
