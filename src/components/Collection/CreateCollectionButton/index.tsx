import { fineFindPages } from '@/utils/urls';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useRouter } from 'next/router';

export const CreateCollectionButton = ({ className }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(fineFindPages.createCollections);
  };
  return (
    <div className={className}>
      <Button color="primary" startIcon={<AddIcon />} onClick={onClick}>
        Create new Collection
      </Button>
    </div>
  );
};
