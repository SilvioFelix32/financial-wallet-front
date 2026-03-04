import { useEffect, useMemo, useRef, useState } from 'react';
import type { FieldErrors } from 'react-hook-form';
import type { TransferFormData } from '@/interfaces/validations.types';
import type { User } from '@/interfaces/user.interfaces';
import { ErrorMessage } from '@/components/ErrorMessage';
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownTriggerText,
  DropdownPlaceholder,
  RecipientText,
  RecipientName,
  RecipientEmail,
  DropdownChevron,
  DropdownMenu,
  DropdownList,
  DropdownItem,
  RecipientAvatar,
} from './styles';
import { IconChevronDown } from '../icons';

type RecipientDropdownProps = {
  availableUsers: User[];
  selectedUserId: string | undefined;
  errors: FieldErrors<TransferFormData>;
  loading?: boolean;
  onSelect: (userId: string) => void;
};

export const RecipientDropdown: React.FC<RecipientDropdownProps> = ({
  availableUsers,
  selectedUserId,
  errors,
  loading = false,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedRecipient = useMemo(
    () => availableUsers.find((u) => u.user_id === selectedUserId) || null,
    [availableUsers, selectedUserId]
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!open) return;
      const root = rootRef.current;
      const target = event.target as Node | null;
      if (!root || !target) return;
      if (!root.contains(target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  const isDisabled = loading || availableUsers.length === 0;

  return (
    <div ref={rootRef}>
      <DropdownRoot>
        <DropdownTrigger
          type="button"
          $hasError={!!errors.toUserId}
          onClick={() => {
            if (isDisabled) return;
            setOpen((v) => !v);
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={isDisabled}
        >
          <DropdownTriggerText>
            {loading ? (
              <DropdownPlaceholder>Carregando usuários...</DropdownPlaceholder>
            ) : availableUsers.length === 0 ? (
              <DropdownPlaceholder>Nenhum usuário disponível</DropdownPlaceholder>
            ) : selectedRecipient ? (
              <>
                <RecipientAvatar>
                  {selectedRecipient.name.slice(0, 2).toUpperCase()}
                </RecipientAvatar>
                <RecipientText>
                  <RecipientName>{selectedRecipient.name}</RecipientName>
                  <RecipientEmail>{selectedRecipient.email}</RecipientEmail>
                </RecipientText>
              </>
            ) : (
              <DropdownPlaceholder>Selecione um usuário</DropdownPlaceholder>
            )}
          </DropdownTriggerText>
          <DropdownChevron $open={open}>
            <IconChevronDown />
          </DropdownChevron>
        </DropdownTrigger>

        {open ? (
          <DropdownMenu role="listbox" aria-label="Lista de destinatários">
            <DropdownList>
              {availableUsers.map((u) => (
                <DropdownItem
                  key={u.user_id}
                  type="button"
                  onClick={() => {
                    onSelect(u.user_id);
                    setOpen(false);
                  }}
                >
                  <RecipientAvatar>{u.name.slice(0, 2).toUpperCase()}</RecipientAvatar>
                  <RecipientText>
                    <RecipientName>{u.name}</RecipientName>
                    <RecipientEmail>{u.email}</RecipientEmail>
                  </RecipientText>
                </DropdownItem>
              ))}
            </DropdownList>
          </DropdownMenu>
        ) : null}
      </DropdownRoot>

      {errors.toUserId ? <ErrorMessage>{errors.toUserId.message}</ErrorMessage> : null}
    </div>
  );
};
