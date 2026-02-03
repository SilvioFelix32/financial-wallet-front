import type { RecipientSelectFieldProps } from '@/interfaces/transfer.interfaces';
import { Controller } from 'react-hook-form';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { ErrorMessage } from '@/components/ErrorMessage';
import { FormGroup } from './styles';

export const RecipientSelectField: React.FC<RecipientSelectFieldProps> = ({
  control,
  errors,
  availableUsers,
  loading = false,
}) => {
  return (
    <FormGroup>
      <Label htmlFor="toUserId">Usuário Destinatário</Label>
      {loading ? (
        <Input
          id="toUserId"
          type="text"
          placeholder="Carregando usuários..."
          disabled
        />
      ) : availableUsers.length === 0 ? (
        <Input
          id="toUserId"
          type="text"
          placeholder="Nenhum usuário disponível"
          disabled
        />
      ) : (
        <Controller
          name="toUserId"
          control={control}
          render={({ field }) => (
            <Select
              id="toUserId"
              hasError={!!errors.toUserId}
              {...field}
            >
              <option value="">Selecione um usuário</option>
              {availableUsers.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.name}
                </option>
              ))}
            </Select>
          )}
        />
      )}
      {errors.toUserId && (
        <ErrorMessage>{errors.toUserId.message}</ErrorMessage>
      )}
    </FormGroup>
  );
};

