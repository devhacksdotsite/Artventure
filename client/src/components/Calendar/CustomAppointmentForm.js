/*
  * components\Calendar\CustomAppointmentTooltip.js
  * Author: Jesse Salinas
  * Date: 10/05/2023
*/
export const CustomAppointmentForm = ({
  visible,
  visibleChange,
  appointmentData,
  commitChanges,
  readOnly,
  ...restProps
}) => {
  console.log('testing this!!!!!!');
  const [instructors, setInstructors] = useState(appointmentData.instructors || '');
  const [availableSpots, setAvailableSpots] = useState(appointmentData.availableSpots || '');
  const [classType, setClassType] = useState(appointmentData.classType || '');

  const handleSaveClick = () => {
    commitChanges({ 
      changed: { 
        ...appointmentData, 
        instructors, 
        availableSpots, 
        classType 
      } 
    });
    visibleChange();
  };

  return (
    <AppointmentForm.Overlay
      visible={visible}
      {...restProps}
    >
      <div style={{ padding: '20px' }}>
        <div>
          <label htmlFor="instructors">Instructors:</label>
          <input
            type="text"
            id="instructors"
            name="instructors"
            value={instructors}
            onChange={(e) => setInstructors(e.target.value)}
            disabled={readOnly}
          />
        </div>

        <div>
          <label htmlFor="availableSpots">Available Spots:</label>
          <input
            type="number"
            id="availableSpots"
            name="availableSpots"
            value={availableSpots}
            onChange={(e) => setAvailableSpots(e.target.value)}
            disabled={readOnly}
          />
        </div>

        <div>
          <label htmlFor="classType">Class Type:</label>
          <select
            id="classType"
            name="classType"
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            disabled={readOnly}
          >
            <option value="kid">Kid</option>
            <option value="teenager">Teenager</option>
            <option value="adult">Adult</option>
          </select>
        </div>

        {!readOnly && (
          <div>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={visibleChange}>Cancel</button>
          </div>
        )}
      </div>
    </AppointmentForm.Overlay>
  );
};

