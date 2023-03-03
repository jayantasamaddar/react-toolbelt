export interface UploadOptions {
  allowMultiple?: boolean;
  accept?: string;
}

export interface UploadButtonProps extends UploadOptions {
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}
