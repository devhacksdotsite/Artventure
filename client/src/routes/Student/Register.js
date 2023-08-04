/*
  * routes\Student\Register.js
  * Author: Jesse Salinas
  * Date: 07/29/2023
*/

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Components
import { StudentInformationForm } from '../../components/Forms/StudentInformationForm';
import { CopyRight } from '../../components/CopyRight';

// MUI
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

//import PaymentForm from './PaymentForm';
//import Review from './Review';

const steps = [ 'Register', 'Schedule', 'Payment' ];

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <StudentInformationForm />
      );
    case 1:
      return (
        <p>Return the calendar here</p>
      );
    case 2:
      return (
        <p>return redirect to payment here.</p>
      );
    default:
      throw new Error('Unknown step');
  }
}

export const Register = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}> 
          <RouterLink 
            to="/" 
            style={{ textDecoration: 'none' }}
          >
            <Box
              component="img"
              sx={{
                m: 1,
                p: 1,
                width: "300px",
              }}
              alt="Artventure Logo."
              src="https://www.artventureoc.com/uploads/3/1/0/6/31060537/published/artventurelogo-horz-rgb.png?1602521733"
            />
          </RouterLink>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            First Class Registration
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={ label }>
                <StepLabel>{ label }</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your joining us!
              </Typography>
              <Typography variant="subtitle1">
                We look forward to seeing you. <Link component={ RouterLink } to="/student/signup" variant="body2">Create an account</Link> to manage any future classes.
                { /* This should send the email address used duting the registration maybe this can be sent back from square... */ }
              </Typography>
            </>
          ) : (
            <>
              { getStepContent(activeStep) }
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                { activeStep !== 0 && (
                  <Button onClick={ handleBack } sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                ) }

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Paper>

        <CopyRight />
      </Container>
    </>
  );
}

