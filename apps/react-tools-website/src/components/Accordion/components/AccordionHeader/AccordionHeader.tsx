import { Icon } from '@/components/Icon';
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight';

interface AccordionHeader {
  /** Unique ID of the Accordion Header */
  id?: string;
  /** Class attribute of the Accordion Header */
  className?: string;
  /** Visible Text of the Accordion Header */
  title?: string;
  /** Whether the Accordion Header is active */
  active?: boolean;
  /** The callback when the Accordion Header is clicked */
  onClick?(): void;
  /** ARIA ATTRIBUTES */
  ariaControls?: string;
}

export const AccordionHeader = ({
  id,
  className,
  title,
  active,
  onClick,
  ariaControls
}: AccordionHeader) => {
  return (
    <h3 className={`RT-AccordionHeader leading-none ${className ?? ''}`}>
      <button
        id={id}
        className="RT-AccordionHeaderButton inline-flex w-full cursor-pointer items-center justify-between font-bold"
        onClick={onClick}
        data-active={active}
        aria-expanded={active ? 'true' : 'false'}
        aria-controls={ariaControls}
        aria-pressed={active ? 'true' : 'false'}
      >
        <span className="RT-AccordionHeaderText text-sm">{title}</span>
        <Icon
          className={`${active && 'rotate-90 transition-transform'} text-sm`}
          src={FaChevronRight}
        />
      </button>
    </h3>
  );
};
