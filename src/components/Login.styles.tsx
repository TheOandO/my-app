import styled from 'styled-components';
import login from '../assets/login.jpg';
import register from '../assets/register.avif';

export const breakpoints = {
  tablet: '768px',
  mobile: '480px'
}

export const LoginPageContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    background: rgba(0, 0, 0);
    @media (max-width: ${breakpoints.tablet}) {

    };
    @media (max-width: ${breakpoints.mobile}) {
      
    }
`;

export const LoginFormContainer = styled.div`
    width: 350px; // Adjust the width according to your design
    padding: 2rem;
    margin-left: auto;
    margin-right: auto;
    background: rgba(0, 0, 0, 0.75); // This gives a semi-transparent background
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
    font-family:'Lora';
    @media (max-width: ${breakpoints.tablet}) {

    };
    @media (max-width: ${breakpoints.mobile}) {
      
    }
`;

export const RegImageContainer = styled.div`
    background-image: url(${register});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; 
    width: 50%; // Take up half of the container width
    height: 100vh;
    flex-shrink: 0;
    @media (max-width: ${breakpoints.tablet}) {

    };
    @media (max-width: ${breakpoints.mobile}) {
      
    }
`

export const LoginImageContainer = styled.div`
    background-image: url(${login});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; 
    width: 50%; // Take up half of the container width
    height: 100vh;
    flex-shrink: 0;
    @media (max-width: ${breakpoints.tablet}) {

    };
    @media (max-width: ${breakpoints.mobile}) {
      
    }
`

export const Logo = styled.img`
    display: block;
    margin: 0 auto 2rem auto; // Center the logo and add some margin at the bottom
    height: 50px; // Adjust based on your logo's design
    width: 50px
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #0f0; // Or your theme's focus color
  }
  @media (max-width: ${breakpoints.tablet}) {

  };
  @media (max-width: ${breakpoints.mobile}) {
    
  }
`;

export const Label = styled.label`
font: "Museo Moderno";
  font-size: 20px;
  color: white;
  display: block;
  margin-top: 20px;
  margin-bottom: 5px;
  @media (max-width: ${breakpoints.tablet}) {

  };
  @media (max-width: ${breakpoints.mobile}) {
    
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 1rem
  @media (max-width: ${breakpoints.tablet}) {

  };
  @media (max-width: ${breakpoints.mobile}) {
    
  }
`;

export const Checkbox = styled.input`
  color: #fff;
  margin-right: 0.5rem;
  @media (max-width: ${breakpoints.tablet}) {

  };
  @media (max-width: ${breakpoints.mobile}) {
    
  }
`;

export const CheckboxLabel = styled.label`
color: white;
  font-size: 1rem;
  font-family: 'Lora';
  margin: 0; // Remove any default margin
`;

export const ForgotPasswordLink = styled.a`
  font-size: 0.9rem;
  color: white;
  text-decoration: none;
  font-family: 'Lora';
  &:hover {
    text-decoration: underline;
    color: #1bca00
  }
  @media (max-width: ${breakpoints.tablet}) {

  };
  @media (max-width: ${breakpoints.mobile}) {
    
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background-color: #017501; // Your button color
  color: white;
  padding: 14px 20px;
  margin: 24px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  font-family: 'FjallaOne';
  &:hover {
    background-color: #005800; // Slightly darker variant for hover state
  }
  @media (max-width: ${breakpoints.tablet}) {

  };
  @media (max-width: ${breakpoints.mobile}) {
    
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #fff; // Adjust the color to fit your design
  font-family: 'Inter';
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #fff; // Adjust the color to fit your design
    margin: 0 10px; // Space between the lines and the text
  }

  @media (max-width: ${breakpoints.tablet}) {
    // Adjust styling for tablet if necessary
  }

  @media (max-width: ${breakpoints.mobile}) {
    // Adjust styling for mobile if necessary
  }
`;

export const SocialIcons = styled.img`
  width: 40px;  // Set the fixed width
  height: 40px; // Set the fixed height
  object-fit: contain; // This will ensure the image maintains its aspect ratio without stretching
`;

export const SocialIconsLink = styled.a`
  display: inline-block; // This allows the width and height to affect the anchor element
  margin: 0 8px; // Add some space between the icons
  // Any other styling you want to apply to the links
`;

export const SocialIconsContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 35px; // Space between icons;
  @media (max-width: ${breakpoints.tablet}) {

  };
  @media (max-width: ${breakpoints.mobile}) {
    
  }
`;

export const SignUpText = styled.span`
  color: #fff; // Or your theme's text color
  margin-right: 5px;
  font-family: 'Inter';

`;

export const SignUpLink = styled.a`
  color: #005800; // Or your theme's button color
  text-decoration: none; // Remove underline from the link
  font-family: 'Inter';
  &:hover {
    color: #017501; // Add underline on hover for better UX
  }
`;

export const FooterLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  @media (max-width: ${breakpoints.tablet}) {

  };
  @media (max-width: ${breakpoints.mobile}) {
    
  }
`;

export const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  };
  @media (max-width: ${breakpoints.tablet}) {

  };
  @media (max-width: ${breakpoints.mobile}) {
    
  }
`;

