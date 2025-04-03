import React from 'react';

import { CssBaseline, Stack, ThemeProvider, useTheme } from '@mui/material';

import { useInspectorDrawerOpen, useSamplesDrawerOpen } from '../documents/editor/EditorContext';
import theme from '../theme';

import { ExternalComponentsProvider } from './ExternalComponentsContext';
import InspectorDrawer, { INSPECTOR_DRAWER_WIDTH } from './InspectorDrawer';
import { SAMPLES_DRAWER_WIDTH } from './SamplesDrawer';
import TemplatePanel from './TemplatePanel';

function useDrawerTransition(cssProperty: 'margin-left' | 'margin-right', open: boolean) {
  const { transitions } = useTheme();
  return transitions.create(cssProperty, {
    easing: !open ? transitions.easing.sharp : transitions.easing.easeOut,
    duration: !open ? transitions.duration.leavingScreen : transitions.duration.enteringScreen,
  });
}

interface AppProps {
  components?: {
    VariableInput: React.ComponentType;
  };
}

export default function App({ components }: AppProps) {
  const inspectorDrawerOpen = useInspectorDrawerOpen();
  const samplesDrawerOpen = useSamplesDrawerOpen();

  const marginLeftTransition = useDrawerTransition('margin-left', samplesDrawerOpen);
  const marginRightTransition = useDrawerTransition('margin-right', inspectorDrawerOpen);

  return (
    // <React.StrictMode>
    <ExternalComponentsProvider components={components as any}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <InspectorDrawer />
        {/* <SamplesDrawer /> */}
        <Stack
          sx={{
            marginRight: inspectorDrawerOpen ? `${INSPECTOR_DRAWER_WIDTH}px` : 0,
            marginLeft: samplesDrawerOpen ? `${SAMPLES_DRAWER_WIDTH}px` : 0,
            transition: [marginLeftTransition, marginRightTransition].join(', '),
          }}
        >
          <TemplatePanel />
        </Stack>
      </ThemeProvider>
      //{' '}
    </ExternalComponentsProvider>
    // </React.StrictMode>
  );
}
