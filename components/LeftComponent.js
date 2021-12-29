import {
  ArchiveIcon,
  ClockIcon,
  CreditCardIcon,
  CubeTransparentIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  IdentificationIcon,
  KeyIcon,
  LockClosedIcon,
  LockOpenIcon,
  PaperClipIcon,
  RefreshIcon,
  ShieldExclamationIcon,
  StarIcon,
  WifiIcon,
} from "@heroicons/react/solid";
import React from "react";

const components = {
  cubeIcon: CubeTransparentIcon,
  starIcon: StarIcon,
  exclamationIcon: ExclamationIcon,
  lockOpenIcon: LockOpenIcon,
  keyIcon: KeyIcon,
  refreshIcon: RefreshIcon,
  exclamationCircleIcon: ExclamationCircleIcon,
  shieldExclamationIcon: ShieldExclamationIcon,
  wifiIcon: WifiIcon,
  clockIcon: ClockIcon,
  lockClosedIcon: LockClosedIcon,
  paperClipIcon: PaperClipIcon,
  creditCardIcon: CreditCardIcon,
  identificationIcon: IdentificationIcon,
  keyIcon: KeyIcon,
  archiveIcon: ArchiveIcon,
};

function LeftComponent({ icon, description }) {
  const MyIcon = components[icon];
  return (
    <div>
      <div className="pl-8 pt-1 pb-1 flex items-center hover:bg-gray-400 hover:rounded hover:border-2 hover:border-blue-400">
        <MyIcon className="text-whiterounded w-5 l-5 border-r border-gray-500" />
        <h2 className="text-grey-500 pl-4 truncate">{description}</h2>
      </div>
    </div>
  );
}

export default LeftComponent;
