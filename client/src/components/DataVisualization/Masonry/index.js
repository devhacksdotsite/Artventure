/*
  * component\DataVisualization\Masonry\index.js
  * Name: MasonryView
  * Author: Jesse Salinas
  * Date: 08/12/2023
*/

// MUI
import { 
  Grid 
} from '@mui/material';

// Data
import { modalData } from '@/data/admin/modalData';

// Components
import { ProfileCard } from '@/components/DataVisualization/Masonry/ProfileCard';
import { Modal } from '@/components/Modal/';

// Hooks
import { useModal } from '@/hooks/useModal';

export const MasonryView = ({ columns, data, slug, setter }) => {

  const ModalData = modalData[slug.name];

  // Hooks
  const { modal, openModal, closeModal } = useModal();

  return (
    <>
      <Grid container spacing={2}>
        { data && data.map((item) => (
          <Grid item xs={12} md={6} lg={4}>
            <ProfileCard 
              rowData={ item } 
              elevation={3} 
              border="1px solid gray" 
              handleEdit={() => 
                openModal(<ModalData.edit.component data={ item } setter={ setter } method='PUT' />, ModalData.edit.title, ModalData.edit.subtitle)
              }
              handleDelete={() => 
                openModal(<ModalData.delete.component data={ item } setter={ setter } method='PUT' closeModal={ closeModal } />, ModalData.delete.title, ModalData.delete.subtitle)
              }
            />
          </Grid>
        )) }
      </Grid>

      <Modal
        open={ modal.open }
        setOpen={ closeModal }
        title={ modal.title }
        subtitle={ modal.subtitle }
      >
        { modal.content }
      </Modal>
    </>
  );

}
