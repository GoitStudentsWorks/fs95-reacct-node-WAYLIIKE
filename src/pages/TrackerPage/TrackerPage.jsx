import { Helmet } from 'react-helmet-async';
import { LogOutModal } from '../../components/LogOutModal/LogOutModal';
import { Container } from '../../components/Container/Container';
import { BaseModal } from '../../components/BaseModal/BaseModal';
import { useEffect, useState } from 'react';
import { UserSettingsModal } from '../../components/UserSettingsModal/UserSettingsModal';
import { Page } from '../../components/Page/Page';
import { WaterMainInfo } from '../../components/WaterMainInfo/WaterMainInfo';
import { useDispatch } from 'react-redux';
import { getDayWater } from '../../redux/water/waterOps';
import { WaterDetailedInfo } from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import css from './TrackerPage.module.css';
import { WaterModal } from '../../components/WaterModal/WaterModal';

export default function TrackerPage() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dispatch = useDispatch();

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);

  const openWaterModal = () => {
    setIsWaterModalOpen(true);
  };

  const closeWaterModal = () => {
    setIsWaterModalOpen(false);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  const getStartOfDay = () => {
    const day = new Date();

    return Date.UTC(day.getFullYear(), day.getMonth(), day.getDate());
  };

  useEffect(() => {
    dispatch(getDayWater(getStartOfDay()));
  }, [dispatch]);

  return (
    <Container>
      <Page>
        <div className={css.flexContainer}>
          <WaterMainInfo openWaterModal={openWaterModal} />

          <WaterDetailedInfo
            openSettings={openSettingsModal}
            openLogout={openLogoutModal}
            openWaterModal={openWaterModal}
          />
        </div>

        <BaseModal isOpen={isLogoutModalOpen} onClose={closeLogoutModal}>
          <LogOutModal title={'Log out'} onClose={closeLogoutModal} />
        </BaseModal>

        <BaseModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal}>
          <UserSettingsModal onClose={closeSettingsModal} />
        </BaseModal>

        <BaseModal isOpen={isWaterModalOpen} onClose={closeWaterModal}>
          <WaterModal
            title={'Add water'}
            subtitle={'Choose a value:'}
            onClose={closeWaterModal}
            toggleHandle={true}
          />
        </BaseModal>
      </Page>

      <Helmet>
        <title>Tracker</title>
      </Helmet>
    </Container>
  );
}
