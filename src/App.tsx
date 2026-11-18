import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Problem from './components/sections/Problem';
import Solution from './components/sections/Solution';
import Products from './components/sections/Products';
import Process from './components/sections/Process';
import Communities from './components/sections/Communities';
import Pilot from './components/sections/Pilot';
import Budget from './components/sections/Budget';
import Sustainability from './components/sections/Sustainability';
import Impact from './components/sections/Impact';
import Science from './components/sections/Science';
import Technology from './components/sections/Technology';
import BusinessModel from './components/sections/BusinessModel';
import Team from './components/sections/Team';
import Sources from './components/sections/Sources';
import Participate from './components/sections/Participate';

export default function App() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-forest-800"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        {/* A. Inicio */}
        <Hero />
        {/* B. Problema y oportunidad */}
        <Problem />
        {/* C. Nuestra propuesta */}
        <Solution />
        {/* E. Productos */}
        <Products />
        {/* F. Proceso productivo + K. Centros comunitarios */}
        <Process />
        <Communities />
        {/* D. Piloto + G. Presupuesto */}
        <Pilot />
        <Budget />
        {/* H. ODS + I. Indicadores + J. Respaldo científico */}
        <Sustainability />
        <Impact />
        <Science />
        {/* Tecnología + M. Modelo de negocio y marketplace */}
        <Technology />
        <BusinessModel />
        {/* L. Equipo + N. Fuentes */}
        <Team />
        <Sources />
        <Participate />
      </main>
      <Footer />
    </>
  );
}
