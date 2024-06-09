import { Prestador } from '@/types';
import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  RichTextField,
  ShowButton,
  TextField,
} from 'react-admin';

export const Providers = (props: Prestador) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="title" />
        <RichTextField source="body" />
        <ShowButton label="" />
        <EditButton label="" />
        <DeleteButton label="" />
      </Datagrid>
    </List>
  );
};
