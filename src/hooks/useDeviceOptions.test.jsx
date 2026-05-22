import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useDeviceOptions } from './useDeviceOptions';

const mockDeviceDetails = {
  internalMemory: ['64GB', '128GB', '256GB'],
  colors: ['Negro', 'Blanco', 'Azul'],
};

describe('useDeviceOptions', () => {
  it('maps storages from deviceDetails internalMemory', () => {
    const { result } = renderHook(() => useDeviceOptions(mockDeviceDetails));

    expect(result.current.storages).toEqual([
      { value: '64GB', label: '64GB' },
      { value: '128GB', label: '128GB' },
      { value: '256GB', label: '256GB' },
    ]);
  });

  it('maps colors from deviceDetails colors', () => {
    const { result } = renderHook(() => useDeviceOptions(mockDeviceDetails));

    expect(result.current.colors).toEqual([
      { value: 'Negro', label: 'Negro' },
      { value: 'Blanco', label: 'Blanco' },
      { value: 'Azul', label: 'Azul' },
    ]);
  });

  it('selects first storage by default', () => {
    const { result } = renderHook(() => useDeviceOptions(mockDeviceDetails));

    expect(result.current.storageSelected).toBe('64GB');
  });

  it('selects first color by default', () => {
    const { result } = renderHook(() => useDeviceOptions(mockDeviceDetails));

    expect(result.current.colorSelected).toBe('Negro');
  });

  it('updates storageSelected when setStorageSelected is called', () => {
    const { result } = renderHook(() => useDeviceOptions(mockDeviceDetails));

    act(() => {
      result.current.setStorageSelected('256GB');
    });

    expect(result.current.storageSelected).toBe('256GB');
  });

  it('updates colorSelected when setColorSelected is called', () => {
    const { result } = renderHook(() => useDeviceOptions(mockDeviceDetails));

    act(() => {
      result.current.setColorSelected('Azul');
    });

    expect(result.current.colorSelected).toBe('Azul');
  });

  it('returns empty arrays when deviceDetails is null', () => {
    const { result } = renderHook(() => useDeviceOptions(null));

    expect(result.current.storages).toEqual([]);
    expect(result.current.colors).toEqual([]);
    expect(result.current.storageSelected).toBe('');
    expect(result.current.colorSelected).toBe('');
  });

  it('returns empty arrays when deviceDetails has no internalMemory or colors', () => {
    const { result } = renderHook(() => useDeviceOptions({}));

    expect(result.current.storages).toEqual([]);
    expect(result.current.colors).toEqual([]);
  });
});
