import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { ModulePage } from './ModulePage';

const { fetchModuleNoteMock, saveModuleNoteMock } = vi.hoisted(() => ({
  fetchModuleNoteMock: vi.fn(),
  saveModuleNoteMock: vi.fn(),
}));

vi.mock('../../lib/dashboardClient', () => ({
  fetchModuleNote: fetchModuleNoteMock,
  saveModuleNote: saveModuleNoteMock,
}));

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/roadmap/:moduleIndex" element={<ModulePage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ModulePage', () => {
  it('shows the honest no-content state instead of inventing a lesson', async () => {
    fetchModuleNoteMock.mockResolvedValue('');
    renderAt('/roadmap/1');

    expect(await screen.findByRole('heading', { name: 'Planning Before Prompting', level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Lesson content for this module hasn't been written yet.")).toBeInTheDocument();
    expect(screen.getByText('No resources published yet.')).toBeInTheDocument();
    expect(screen.getByText('Checkpoint: Plan or blueprint approval')).toBeInTheDocument();
  });

  it('loads and saves real notes for the current module', async () => {
    fetchModuleNoteMock.mockResolvedValue('Existing note');
    saveModuleNoteMock.mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderAt('/roadmap/1');

    const textarea = await screen.findByPlaceholderText('Write your own notes for this module. Only you can see them.');
    expect(textarea).toHaveValue('Existing note');

    await user.type(textarea, ' plus more.');
    await user.click(screen.getByRole('button', { name: 'Save notes' }));

    expect(saveModuleNoteMock).toHaveBeenCalledWith(1, 'Existing note plus more.');
    expect(await screen.findByText('Saved.')).toBeInTheDocument();
  });

  it('disables the previous-module control on the first module', async () => {
    fetchModuleNoteMock.mockResolvedValue('');
    renderAt('/roadmap/0');

    expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous module' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next module' })).toBeEnabled();
  });
});
