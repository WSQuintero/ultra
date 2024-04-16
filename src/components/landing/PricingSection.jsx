import {
  Box,
  Button,
  Chip,
  Icon,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material';
import { GoldButton } from './GoldButton';
import { CheckBox } from '@mui/icons-material';
import BGTypography from '../shared/BGTypography';
import InterTypography from '../shared/InterTypography';

const PricingSection = () => {
  const matches900 = useMediaQuery('(max-width:900px)');
  return (
    <Box
      id="plans-princing"
      display={'flex'}
      overflow={'hidden'}
      flexDirection={'column'}
      padding={4}
    >
      <BGTypography
        color={'white'}
        variant="h2"
        fontSize={48}
        margin={'auto'}
        marginBottom={2}
      >
        Pricing & Plans
      </BGTypography>
      <Typography
        color="#b6b5b4"
        fontSize={18}
        margin={'auto'}
        textAlign={'center'}
      >
        Both a free trial and a free set of features for anyone who wants to{' '}
        <br /> use them. The more orders your company
      </Typography>
      <Box
        justifyContent={matches900 ? 'flex-start' : 'center'}
        width={'100%'}
        // paddingLeft={matches900 ? '400px' : 0}
        minWidth={'450px'}
        sx={{ overflowX: 'auto', display: 'flex' }}
        margin={`${matches900 ? '10px' : '50px'} auto 0`}
        gap={matches900 ? 5 : 10}
      >
        {plans.map((plan, i) => (
          <PlanCard key={i} {...plan} />
        ))}
      </Box>
    </Box>
  );
};

const PlanCard = ({
  title,
  chipTitle,
  chipSubtitle,
  imageSrc,
  imageAlt,
  price,
  originalPrice,
  buttonTitle,
  buttonProps = {},
  goldButton,
  benefits,
  styles,
}) => {
  const matches500 = useMediaQuery('(max-width:500px)');
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      sx={{
        minWidth: matches500 ? '360px' : '410px',
        width: matches500 ? '360px' : '410px',
        height: '830px',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
      }}
      borderRadius={'16px'}
    >
      <Box
        borderRadius={'16px 16px 0 0'}
        sx={{
          background: `linear-gradient(360deg, rgba(0,0,0,0.8211659663865546) 3%, rgba(0,0,0,0) 53%), url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '160px',
          position: 'relative',
        }}
      >
        <BGTypography
          color={'white'}
          position={'absolute'}
          bottom={20}
          fontSize={24}
          width={'100%'}
          textAlign={'center'}
        >
          {title}
        </BGTypography>
      </Box>
      <Box
        marginTop={4}
        margin={'auto'}
        padding={2.2}
        display={'flex'}
        flexDirection={'column'}
        flex={1}
      >
        <BGTypography margin={'auto'} color={'#EEE4F5'} variant="">
          <BGTypography
            color={'#FCFCFD'}
            component="span"
            display="inline"
            fontSize={25}
            sx={{
              verticalAlign: 'top',
            }}
          >
            $
          </BGTypography>
          <BGTypography fontSize={40} display={'inline'} lineHeight={1.4}>
            {price}
          </BGTypography>{' '}
          <BGTypography display="inline" component="span" fontSize={25}>
            /month
          </BGTypography>
        </BGTypography>
        <Box
          textAlign={'center'}
          borderBottom={'1px solid rgba(64, 65, 68, 1)'}
          marginBottom={2}
          marginTop={3}
        >
          <Chip
            label={chipTitle}
            sx={{
              color: 'white',
              backgroundColor: '#474748',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <InterTypography
            margin={'5px auto 29px'}
            width={'90%'}
            color={'white'}
          >
            {chipSubtitle}
          </InterTypography>
        </Box>
        <Box
          display={'flex'}
          flex={1}
          flexDirection={'column'}
          justifyContent={'space-between'}
        >
          <Box>
            {benefits.map((benefit, i) => (
              <Box
                key={i}
                display={'flex'}
                alignItems={'center'}
                marginBottom={1}
              >
                <img
                  src="/Ultra_files/goldcheckbox.svg"
                  style={{ width: 'auto', height: '20px', marginRight: '5px' }}
                />
                <BGTypography
                  marginLeft={0.5}
                  color="white"
                  display={'inline'}
                  sx={{
                    fontSize: {
                      xs: '16px',
                      md: '18px',
                    },
                  }}
                >
                  {benefit}
                </BGTypography>
              </Box>
            ))}
          </Box>
          {goldButton ? (
            <GoldButton fullWidth size="large" {...buttonProps}>
              {buttonTitle}
            </GoldButton>
          ) : (
            <GrayOutlinedButton
              color="primary2"
              variant="outlined"
              size="large"
              fullWidth
              {...buttonProps}
            >
              {buttonTitle}
            </GrayOutlinedButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const GoldCheckbox = styled(CheckBox)({
  color: '#d9a737',
  borderRadius: '10px',
});

const GrayOutlinedButton = styled(Button)({
  color: '#FFF',
  background: '#1E1E1F',
  border: '1px solid',
  borderColor: 'rgba(255, 255, 255, 0.1)',
});

const plans = [
  {
    title: 'Plan 90',
    imageSrc: '/Ultra_files/bitcoin.png',
    price: 299,
    originalPrice: 299,
    chipTitle: 'Despues de 3 meses',
    chipSubtitle: 'Continuar con todos los beneficios por 29.9 mensuales',
    benefits: [
      'Crecimiento personal',
      'Analisis en vivo forex e indices sintéticos',
      'Curso de indices sinteticos',
      'Curso de forex',
      'Curso de acciones',
      'Cuenta de fondeo 5K',
      'Curso básico dropshipping',
      'Seminario de riqueza',
      'Grupo VIP de telegram',
      'Sesion preguntas y respuestas',
    ],
    buttonTitle: 'Protect Now',
    goldButton: true,
  },
  {
    title: 'Club del fondeo 2.0',
    imageSrc: '/Ultra_files/coins.png',
    price: 300,
    originalPrice: '-',
    chipTitle: 'Despues de 3 meses',
    chipSubtitle: 'Continuar con todos los beneficios por 29.9 mensuales',
    benefits: [
      'Acceso por 90 días',
      'Curso de forex',
      'Plan de trading',
      '2 sesiones en vivo',
      '1 espacios de psicotrading',
      '1 espacio de backtesting',
      '1 Sesión de preguntas y respuestas',
    ],
    buttonTitle: 'Protect Now',
  },
];

export default PricingSection;
