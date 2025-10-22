/// <reference types="vite/client" />

/**
 * Google Publisher Tag (GPT) type declarations
 */
declare global {
  namespace googletag {
    type GeneralSize = SingleSize | MultiSize;
    type SingleSize = SingleSizeArray | NamedSize;
    type SingleSizeArray = [number, number];
    type NamedSize = string | 'fluid';
    type MultiSize = SingleSize[];

    interface CommandArray {
      push(callback: () => void): number;
    }

    interface Slot {
      addService(service: Service): Slot;
      defineSizeMapping(sizeMapping: SizeMappingArray): Slot;
      getSlotElementId(): string;
    }

    interface Service {}

    interface PubAdsService extends Service {
      enableSingleRequest(): boolean;
      enableLazyLoad(config?: LazyLoadConfig): void;
      setPrivacySettings(settings: PrivacySettingsConfig): void;
      refresh(slots?: Slot[]): void;
      addEventListener(eventType: string, listener: (event: any) => void): void;
    }

    interface LazyLoadConfig {
      fetchMarginPercent?: number;
      renderMarginPercent?: number;
      mobileScaling?: number;
    }

    interface PrivacySettingsConfig {
      limitedAds?: boolean;
    }

    interface SizeMappingBuilder {
      addSize(viewportSize: [number, number], slotSize: GeneralSize): SizeMappingBuilder;
      build(): SizeMappingArray;
    }

    type SizeMappingArray = any;

    function defineSlot(adUnitPath: string, size: GeneralSize, divId: string): Slot | null;
    function display(divId: string): void;
    function enableServices(): void;
    function destroySlots(slots?: Slot[]): boolean;
    function pubads(): PubAdsService;
    function sizeMapping(): SizeMappingBuilder;
    function openConsole(): void;

    const cmd: CommandArray;
  }

  interface Window {
    googletag: typeof googletag & { cmd: any[] };
  }
}

export {};
