// index.js (Router Configuration)
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home_Page.vue';
import MainLayout from '../components/Main_Layout.vue'; 
import Sign_Up_Log_In from '../views/Sign_Up_Log_In.vue';
import Latest_News from '../views/Latest_News.vue'; // import the LatestNews Component
import Status_Check from '../views/Status_Check.vue';
import Profile_Page from '../views/Profile_Page.vue';
import My_Stars from '../views/My_Stars.vue';
import Star_Details from '../views/Star_Details.vue';
import Planet_Details from '../views/Planet_Details.vue';
import Moon_Details from '../views/Moon_Details.vue';
import Star_Encyclopedia from '../views/Encyclopedia_Star.vue';
import Planet_Encyclopedia from '../views/Encyclopedia_Planets.vue';
import Moon_Encyclopedia from '../views/Encyclopedia_Moons.vue';
import Liked_Objects from '../views/Liked_Objects.vue';
import Interacted_Objects from '../views/Interacted_Objects.vue';
import User_Settings from '../views/User_Settings.vue';
import Layer_1_Best_Right_Now from '../views/Layer_1_Best_Right_Now.vue';
import Calender_Component from '../components/Celestial_Calender.vue';
import Location_Component from '../components/Location_Component.vue';
import Layer_2_Trend_Booster from '../views/Layer_2_Trend_Booster.vue';
import Layer_3_Familiar_Picks from '../views/Layer_3_Familiar_Picks.vue';
import Layer_4_Hidden_Matches from '../views/Layer_4_Hidden_Matches.vue';
import Layer_5_Poppys_Pick from '../views/Layer_5_Poppys_Pick.vue';
import Recommendation_Information from '../views/Recommendation_Information.vue';
import Stargazing_Forecast from '../views/Stargazing_Forecast.vue';
import Stargaze_Guide from '../views/Stargaze_Guide.vue';
import Equipment_Guide from '../views/Equipment_Guide.vue';
import Object_Identification from '../views/Identify_Your_Object.vue';
import Tips_And_Tricks_Guide from '../views/Tips_And_Tricks_Guide.vue';
import All_Objects from '../views/All_Objects.vue';
import Object_Category from '../views/Object_Category.vue';
import Deep_Space_Scanner from '../views/Deep_Space_Scanner.vue';
import Star_Catalog from '../views/Star_Catalog.vue';
import Purchase_Star from '../views/Purchase_Star.vue';
import Contact_Hub from '../views/Contact_Hub.vue';
import Comparison_Lab from '../views/Comparison_Lab.vue';
import More from '../views/More.vue';
import Our_Story from '../views/Our_Story.vue';
import Privacy_Policy from '../views/Privacy_Policy.vue';
import Terms_And_Conditions from '../views/Terms_And_Conditions.vue';
import Star_Owners_Page from '../views/Star_Owners_Page.vue';
import Official_Partners from '../views/Official_Partners.vue';
import Core_Components from '../views/Core_Components.vue';
import Cosmic_Glossary from '../views/Cosmic_Glossary.vue';

// define your routes
const routes = [
  {
    path: '/',
    component: MainLayout, // This is the wrapper component (Navbar, Footer, and a hole for content)
    children: [ // The children array defines the content that goes into the <router-view /> of MainLayout
      {
        path: '', // An empty path makes this the default view for the parent path ('/')
        name: 'Home',
        component: HomePage, // This is the component that will be rendered inside MainLayout's <router-view />
      },
      {
        path: '/sign-up-login', // Define the route for the sign up / login page
        name: 'signUpLogin',
        component: Sign_Up_Log_In,
      },
      {
        path: '/Latest_News',
        name: "Latest News",
        component: Latest_News
      },
      {
        path: '/System-Status',
        name: "Status",
        component: Status_Check
      },
      {
        path: '/Profile_Page',
        name: "Profile Page",
        component: Profile_Page
      },
      {
        path: '/My_Stars',
        name: "My Stars",
        component: My_Stars
      },
      {
        path: '/star/:id',   
        name: 'Star',
        component: Star_Details,
        props: true           
      },
      {
        path: '/planet/:id',   
        name: 'planet',
        component: Planet_Details,
        props: true           
      },
      {
        path: '/moon/:id',   
        name: 'moon',
        component: Moon_Details,
        props: true           
      },
      {
        path: '/Encyclopedia_stars',   
        name: 'Encyclopedia Planets',
        component: Star_Encyclopedia,
      },
      {
        path: '/Encyclopedia_Planets',   
        name: 'Encyclopedia planets',
        component: Planet_Encyclopedia,
      },
      {
        path: '/Encyclopedia_Moons',   
        name: 'Encyclopedia Moons',
        component: Moon_Encyclopedia,
      },
      {
        path: '/Liked_Objects',   
        name: 'liked Objects',
        component: Liked_Objects,
      },
      {
        path: '/Interacted_Objects',   
        name: 'interacted Objects',
        component: Interacted_Objects,
      },
      {
        path: '/User_Settings',   
        name: 'User Settings',
        component: User_Settings,
      },
      {
        path: '/Layer1_Recommendations',   
        name: 'Layer 1 Recommendations',
        component: Layer_1_Best_Right_Now,
        children: [
          {
            path: 'calendar', // Access via /Layer1_Recommendations/calendar
            name: 'Celestial Calendar',
            component: Calender_Component,
          },
          {
            path: 'location', // Access via /Layer1_Recommendations/location
            name: 'Galactic GPS',
            component: Location_Component,
          }
        ]
      },
      {
        path: '/Layer2_Recommendations',   
        name: 'Layer 2 Recommendations',
        component: Layer_2_Trend_Booster,
        children: [
          {
            path: 'calendar', 
            name: 'Celestial Calendar',
            component: Calender_Component,
          },
          {
            path: 'location', 
            name: 'Galactic GPS',
            component: Location_Component,
          }
        ]
      },
      {
        path: '/Layer3_Recommendations',   
        name: 'Layer 3 Recommendations',
        component: Layer_3_Familiar_Picks,
        children: [
          {
            path: 'calendar', 
            name: 'Celestial Calendar',
            component: Calender_Component,
          },
          {
            path: 'location', 
            name: 'Galactic GPS',
            component: Location_Component,
          }
        ]
      },
      {
        path: '/Layer4_Recommendations',   
        name: 'Layer 4 Recommendations',
        component: Layer_4_Hidden_Matches,
        children: [
          {
            path: 'calendar', 
            name: 'Celestial Calendar',
            component: Calender_Component,
          },
          {
            path: 'location', 
            name: 'Galactic GPS',
            component: Location_Component,
          }
        ]
      },
      {
        path: '/Layer5_Recommendations',   
        name: 'Layer 5 Recommendations',
        component: Layer_5_Poppys_Pick,
        children: [
          {
            path: 'calendar', 
            name: 'Celestial Calendar',
            component: Calender_Component,
          },
          {
            path: 'location', 
            name: 'Galactic GPS',
            component: Location_Component,
          }
        ]
      },
      {
        path: '/engine-details',
        name: "Recommendation Info",
        component: Recommendation_Information
      },
      {
        path: '/stargazing-forecast',
        name: "Stargazing Forecast",
        component: Stargazing_Forecast
      },
      {
        path: '/stargazing-guide',
        name: "Stargazing Guide",
        component: Stargaze_Guide
      },
      {
        path: '/equipment-guide',
        name: "Equipment Guide",
        component: Equipment_Guide
      },
      {
        path: '/object-identification',
        name: "Object Identification",
        component: Object_Identification
      },
      {
        path: '/tips_and_tricks',
        name: "Tips And Tricks",
        component: Tips_And_Tricks_Guide
      },
      {
        path: '/all_objects',
        name: "All Objects",
        component: All_Objects
      },
      {
        path: '/object_category',
        name: "Object Category",
        component: Object_Category
      },
      {
        path: '/deep_space_scanner',
        name: "Deep Space Scanner",
        component: Deep_Space_Scanner
      },
      {
        path: '/star_catalog',
        name: "Star Catalog",
        component: Star_Catalog
      },
      {
        path: '/purchase_star/:id',   
        name: 'Purchase Star',
        component: Purchase_Star,
        props: true           
      },
      {
        path: '/contact_hub',   
        name: 'Contact Hub',
        component: Contact_Hub,
      },

      {
        path: '/comparison_lab',   
        name: 'Comparison Lab',
        component: Comparison_Lab,
      },

      {
        path: '/more',   
        name: 'More ',
        component: More,
      },

      {
        path: '/our_story',   
        name: 'Our Story ',
        component: Our_Story,
      },

      {
        path: '/privacy_policy',   
        name: 'Privacy Policy ',
        component: Privacy_Policy,
      },
      {
        path: '/terms_and_conditions',   
        name: 'Terms And Conditions',
        component: Terms_And_Conditions,
      },
      {
        path: '/owned_stars',   
        name: 'Owned Stars',
        component: Star_Owners_Page,
      },
      {
        path: '/official_partners',   
        name: 'Official partners',
        component: Official_Partners,
      },
      {
        path: '/core_components',   
        name: 'Core Components',
        component: Core_Components,
      },
      {
        path: '/cosmic_glossary',   
        name: 'Cosmic Glossary',
        component: Cosmic_Glossary,
      },
      
    ],
  },
  // you can add more routes here later (e.g., path: 'about', component: AboutPage)
];

// create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Add this part:
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // If they hit the 'back' button, take them to where they were
      return savedPosition;
    } else {
      // For new links, always go to the top
      return { top: 0 };
    }
  },
});


export default router;