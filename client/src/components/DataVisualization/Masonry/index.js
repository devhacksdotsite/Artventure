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

// Components
import { Modal } from '@/components/Modal/';

// Hooks
import { useModal } from '@/hooks/useModal';

export const MasonryView = ({ columns, data, slug, setter, ModalData }) => {

  // Hooks
  const { modal, openModal, closeModal } = useModal();

  return (
    <>
      {data && data.length > 0 ? (
        <Grid container spacing={2}>
          { data.map((item, idx) => (
            <Grid item xs={12} md={6} lg={4} key={ idx }>
              <ModalData.tag.component
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
      ) : (
        <Grid container justifyContent="center">
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            No data available
          </Grid>
        </Grid>
      )}

      <Modal
        open={modal.open}
        setOpen={closeModal}
        title={modal.title}
        subtitle={modal.subtitle}
      >
        {modal.content}
      </Modal>
    </>
  );

}
