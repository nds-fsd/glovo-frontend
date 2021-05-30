import DropDown from '../../modal/dropdown';
import DeliveryInformation from '../../deliveryInformation';

export const ShoppingCartNav = ({ open, onClose }) => {
  return (
    <DropDown open={open} onClose={onClose}>
      <DeliveryInformation showIcons={false} />
    </DropDown>
  );
};
