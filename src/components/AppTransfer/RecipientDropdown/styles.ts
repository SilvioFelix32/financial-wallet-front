import styled from 'styled-components';

export const DropdownRoot = styled.div`
  position: relative;
`;

export const DropdownTrigger = styled.button<{ $hasError?: boolean }>`
  width: 100%;
  height: 3rem;
  padding: 0.75rem 1rem;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? theme.colors.errorSoft : theme.colors.primarySoft};
  }
`;

export const DropdownTriggerText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const DropdownPlaceholder = styled.span`
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RecipientText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
`;

export const RecipientName = styled.span`
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RecipientEmail = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DropdownChevron = styled.span<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  color: ${({ theme }) => theme.colors.textSecondary};
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  flex-shrink: 0;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  z-index: 30;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
`;

export const DropdownList = styled.div`
  max-height: 16rem;
  overflow-y: auto;
`;

export const DropdownItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: background 0.15s;
  color: ${({ theme }) => theme.colors.textPrimary};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

export const RecipientAvatar = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
`;
